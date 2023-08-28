import { NextResponse } from "next/server";

import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from '@/app/libs/prismadb';

interface IParams {
    documentId?: string
}

export async function DELETE(
    request: Request,
    { params }: { params: IParams}
) {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return NextResponse.error();
    }

    const { documentId } = params;

    if ( !documentId || typeof documentId !== 'string'){
        throw new Error('Invalid ID');
    }

    const document = await prisma.document.deleteMany({
        where: {
            id: documentId,
            userId: currentUser.id
        }
    });

    return NextResponse.json(document);
}

export async function PUT(
    request: Request,
    { params }: { params: IParams}
) {
    const body = await request.json();
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return NextResponse.error();
    }

    const { documentId } = params;

    if ( !documentId || typeof documentId !== 'string'){
        throw new Error('Invalid ID');
    }

    const {
        title,
        description,
        projectId,
    } = body;

    Object.keys(body).forEach((value: any) => {
        if (!body[value]) {
            return NextResponse.error();
        }
    });

    const document = await prisma.document.updateMany({
        where: {
            id: documentId,
            userId: currentUser.id
        },
        data: {
            title: title,
            description: description,
            projectId: projectId,
            userId: currentUser.id
        }
    })

    return NextResponse.json(document);
}