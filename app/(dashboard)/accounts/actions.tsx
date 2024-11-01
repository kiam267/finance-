'use client';

import { Edit, MoreHorizontal, Trash } from 'lucide-react';

import { useConfirm } from '@/hook/use-conform';

import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { useOpenAccount } from '@/features/accounts/hooks/use-open-account';
import { useDeleteAccount } from '@/features/accounts/api/use-delete-accounts';

type Props = {
    id: string;
};

export const Actions = ({ id }: Props) => {

    const [ConfirmDialog, confirm] = useConfirm(
        "Are your sure?",
        "You are about to delete this account."
    )
    const deleteMutation = useDeleteAccount(id);
    const { onOpen } = useOpenAccount();



    const handelDelete = async () => { 
        const ok = await confirm();
        if (ok) {
            deleteMutation.mutate();
        }
       
    }
    return (
        <>
            <ConfirmDialog />
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant='ghost' className='size-8 p-0'>
                        <MoreHorizontal className='size-4' />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align='end'>
                    <DropdownMenuItem
                        disabled={deleteMutation.isPending}
                        onClick={() => onOpen(id)}
                    >
                        <Edit className='size-4 mr-2 ' />
                        Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        disabled={deleteMutation.isPending}
                        onClick={handelDelete}
                    >
                        <Trash className='size-4 mr-2 ' />
                        Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    );
};
