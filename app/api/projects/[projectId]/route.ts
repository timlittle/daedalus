import { NextResponse } from "next/server";

import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from '@/app/libs/prismadb';

interface IParams {
    projectId?: string
}

export async function DELETE(
    request: Request,
    { params }: { params: IParams}
) {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return NextResponse.error();
    }

    const { projectId } = params;

    if ( !projectId || typeof projectId !== 'string'){
        throw new Error('Invalid ID');
    }

    const project = await prisma.project.deleteMany({
        where: {
            id: projectId,
            userId: currentUser.id
        }
    });

    return NextResponse.json(project);
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

    const { projectId } = params;

    if ( !projectId || typeof projectId !== 'string'){
        throw new Error('Invalid ID');
    }

    const {
        title,
        description,
    } = body;

    Object.keys(body).forEach((value: any) => {
        if (!body[value]) {
            NextResponse.error();
        }
    });

    const project = await prisma.project.updateMany({
        where: {
            id: projectId,
            userId: currentUser.id
        },
        data: {
            title: title,
            description: description,
            userId: currentUser.id
        }
    })

    return NextResponse.json(body)
}