import { z } from 'zod';

import { useNewAccount } from '@/features/accounts/hooks/use-new-account';
import { AccountFrom } from '@/features/accounts/components/account-form';
import { useCreateAccount } from '@/features/accounts/api/use-create-accounts';

import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet';

import { insertAccountSchema } from '@/db/schema';

const formSchema = insertAccountSchema.pick({
    name: true,
});

type FormValues = z.input<typeof formSchema>;

export const NewAccountSheet = () => {
    const { isOpen, onClose } = useNewAccount();
    const mutation = useCreateAccount();

    const onSubmit = (values: FormValues) => {
        mutation.mutate(values, {
            onSuccess: () => {
                onClose();
            },
        });
    };

    return (
        <Sheet open={isOpen} onOpenChange={onClose}>
            <SheetContent className='space-y-4'>
                <SheetHeader>
                    <SheetTitle>New Account</SheetTitle>
                    <SheetDescription>Create a new account to track your transaction.</SheetDescription>
                </SheetHeader>
                <AccountFrom
                    onSubmit={onSubmit}
                    disabled={mutation.isPending}
                    defaultValue={{
                        name: '',
                    }}
                />
            </SheetContent>
        </Sheet>
    );
};