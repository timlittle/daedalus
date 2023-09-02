import {NextResponse} from 'next/server'
import prisma from '@/app/libs/prismadb'

export async function POST(
    request: Request
) {
    const body = await request.json();

    const {
        documentId,
        userId
    } = body;

    Object.keys(body).forEach((value: any) => {
        if (!body[value]) {
            NextResponse.error();
        }
    });

    const permission = await prisma.userDocumentPermission.create({
        data: {
            documentId,
            userId
        }
    })

    return NextResponse.json(permission);
}