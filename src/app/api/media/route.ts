import { NextResponse } from 'next/server';
import fs from 'node:fs';
import path from 'node:path';
import { getCurrentAdmin } from '@/lib/auth';

const MEDIA_UPLOAD_DIR = path.join(process.cwd(), 'public', 'uploads', 'media');
const NGO_IMAGES_DIR = path.join(process.cwd(), 'public', 'images', 'ngo');

// Ensure upload directory exists
if (!fs.existsSync(MEDIA_UPLOAD_DIR)) {
  fs.mkdirSync(MEDIA_UPLOAD_DIR, { recursive: true });
}

function getFilesFromDir(dir: string, basePublicUrl: string) {
  if (!fs.existsSync(dir)) return [];
  const files = fs.readdirSync(dir);
  return files
    .filter((f) => /\.(jpg|jpeg|png|webp|svg|gif)$/i.test(f))
    .map((f) => {
      const fullPath = path.join(dir, f);
      const stat = fs.statSync(fullPath);
      const sizeKB = Math.round(stat.size / 1024);
      const sizeStr = sizeKB > 1024 ? `${(sizeKB / 1024).toFixed(1)} MB` : `${sizeKB} KB`;

      let category = 'Activity Photo';
      if (f.startsWith('hero')) category = 'Hero Slides';
      else if (f.startsWith('initiative')) category = 'Initiatives';
      else if (f.startsWith('campaign')) category = 'Campaigns';
      else if (f.startsWith('story')) category = 'Stories of Change';
      else if (f.startsWith('volunteer')) category = 'Volunteers';
      else if (basePublicUrl.includes('uploads')) category = 'Uploaded Media';

      return {
        name: f,
        url: `${basePublicUrl}/${f}`,
        size: sizeStr,
        sizeBytes: stat.size,
        category,
        modifiedAt: stat.mtime.toISOString(),
        isDeletable: basePublicUrl.includes('uploads')
      };
    });
}

export async function GET() {
  const admin = await getCurrentAdmin();
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const ngoFiles = getFilesFromDir(NGO_IMAGES_DIR, '/images/ngo');
  const uploadFiles = getFilesFromDir(MEDIA_UPLOAD_DIR, '/uploads/media');

  const allMedia = [...uploadFiles, ...ngoFiles].sort(
    (a, b) => new Date(b.modifiedAt).getTime() - new Date(a.modifiedAt).getTime()
  );

  return NextResponse.json(allMedia);
}

export async function POST(req: Request) {
  try {
    const admin = await getCurrentAdmin();
    if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const formData = await req.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml'];
    if (!validTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Only image files (JPG, PNG, WEBP, GIF, SVG) are allowed' },
        { status: 400 }
      );
    }

    // Max 15MB
    if (file.size > 15 * 1024 * 1024) {
      return NextResponse.json({ error: 'File size exceeds 15MB limit' }, { status: 400 });
    }

    const originalName = file.name || 'image.jpg';
    const cleanName = originalName.replace(/[^a-zA-Z0-9.-]/g, '_');
    const filename = `${Date.now()}-${cleanName}`;
    const targetPath = path.join(MEDIA_UPLOAD_DIR, filename);

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    fs.writeFileSync(targetPath, buffer);

    const publicUrl = `/uploads/media/${filename}`;

    return NextResponse.json({
      success: true,
      url: publicUrl,
      filename,
      size: `${Math.round(file.size / 1024)} KB`
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Upload failed';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const admin = await getCurrentAdmin();
    if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const body = await req.json();
    const fileUrl = body.url as string;

    if (!fileUrl || !fileUrl.startsWith('/uploads/media/')) {
      return NextResponse.json(
        { error: 'Can only delete files uploaded to /uploads/media/' },
        { status: 400 }
      );
    }

    const filename = path.basename(fileUrl);
    const targetPath = path.join(MEDIA_UPLOAD_DIR, filename);

    if (fs.existsSync(targetPath)) {
      fs.unlinkSync(targetPath);
      return NextResponse.json({ success: true, message: 'File deleted successfully' });
    } else {
      return NextResponse.json({ error: 'File not found on disk' }, { status: 404 });
    }
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Delete failed';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
