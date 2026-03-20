import { put } from '@vercel/blob';
import type { VercelRequest, VercelResponse } from '@vercel/node';

export const config = {
    api: {
        bodyParser: false,
    },
};

// Helper to collect body as Buffer
function collectBody(req: VercelRequest): Promise<Buffer> {
    return new Promise((resolve, reject) => {
        const chunks: Buffer[] = [];
        req.on('data', (chunk: Buffer) => chunks.push(chunk));
        req.on('end', () => resolve(Buffer.concat(chunks)));
        req.on('error', reject);
    });
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
    // CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, x-filename, Authorization');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'POST') {
        return res.status(405).json({
            success: false,
            error: 'Method not allowed',
        });
    }

    try {
        const filename = req.headers['x-filename'] as string;
        if (!filename) {
            return res.status(400).json({
                success: false,
                error: 'Missing x-filename header',
            });
        }

        const contentType = req.headers['content-type'] || 'application/octet-stream';
        const body = await collectBody(req);

        if (body.length === 0) {
            return res.status(400).json({
                success: false,
                error: 'Empty file body',
            });
        }

        // Sanitize filename
        const safeName = filename.replace(/[^a-zA-Z0-9._-]/g, '_');
        const blobPath = `cars/${Date.now()}-${safeName}`;

        // Upload to Vercel Blob
        // Using 'public' access so car images can be displayed to all visitors
        const blob = await put(blobPath, body, {
            access: 'public',
            contentType: contentType,
            addRandomSuffix: true,
        });

        return res.status(200).json({
            success: true,
            url: blob.url,
            pathname: blob.pathname,
            contentType: blob.contentType,
            size: body.length,
            message: 'File uploaded successfully to Vercel Blob',
        });
    } catch (error: any) {
        console.error('Upload Error:', error);
        return res.status(500).json({
            success: false,
            error: 'Upload failed',
            details: error.message,
        });
    }
}
