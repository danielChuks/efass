import { ReactNode } from 'react';
import Filter from '../FilterBy';
import { options } from '../FilterBy/dommy';
import SearchBar from '../SearchBar';
import styles from './index.module.scss';

interface PageContentProps {
    children: ReactNode;
    showFilter?: boolean;
  }


function PageContent({ children, showFilter = true }: PageContentProps) {
    return (
        <div className={styles['table_body']}>
        <div className={styles['contentTopSection']}>
            <SearchBar />
            {/* {showFilter && <Filter options={options} />} */}
        </div>
        {children}

    </div>
        
        );
}

export default PageContent;
