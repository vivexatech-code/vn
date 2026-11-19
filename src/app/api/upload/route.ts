import { NextRequest, NextResponse } from 'next/server';
import fs from 'node:fs';
import path from 'node:path';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;
    const folder = (formData.get('folder') as string) || 'admissions';

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // Validate size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json({ error: 'File size exceeds 10MB limit' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Sanitize filename and create unique name
    const ext = path.extname(file.name) || '.bin';
    const cleanBase = path.basename(file.name, ext).replace(/[^a-zA-Z0-9_-]/g, '_').substring(0, 30);
    const uniqueName = `${cleanBase}_${Date.now()}_${Math.random().toString(36).substring(2, 7)}${ext}`;

    const targetDir = path.join(process.cwd(), 'public', 'uploads', folder);
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }

    const filePath = path.join(targetDir, uniqueName);
    fs.writeFileSync(filePath, buffer);

    const publicUrl = `/uploads/${folder}/${uniqueName}`;

    return NextResponse.json({
      success: true,
      url: publicUrl,
      fileName: file.name,
      fileSize: file.size
    });
  } catch (error) {
    console.error('File upload failed:', error);
    return NextResponse.json({ error: 'File upload failed' }, { status: 500 });
  }
}
