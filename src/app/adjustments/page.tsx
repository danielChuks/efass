import { Metadata } from 'next';
import { Adjustments } from '../../page/Adjustments';

export const metadata: Metadata = {
    title: 'Adjustments | EFASS',
    description: 'Adjustments page for EFASS',
};
export default function AdjustmentsPage() {
    return <Adjustments />;
}
