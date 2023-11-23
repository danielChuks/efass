import { Metadata } from 'next';
import { Adjustments } from '../../page/Adjustments';
import { AuthWrapper } from '../../providers/AuthWrapper';

export const metadata: Metadata = {
    title: 'Adjustments | EFASS',
    description: 'Adjustments page for EFASS',
};
export default function AdjustmentsPage() {
    return (
        <AuthWrapper>
            <Adjustments />
        </AuthWrapper>
    );
}
