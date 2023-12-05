import { Metadata } from 'next';
import { AuthWrapper } from '../../providers/AuthWrapper';
import { NoteToPL } from '../../page/NoteToPL';

export const metadata: Metadata = {
    title: 'Notes-to-pl | EFASS',
    description: 'Notes-to-pl page for EFASS',
};
export default function NotesToPlPage() {
    return (
        <AuthWrapper>
            <NoteToPL />
        </AuthWrapper>
    );
}
