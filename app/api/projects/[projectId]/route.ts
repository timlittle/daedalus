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
        console.log(projectId);
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