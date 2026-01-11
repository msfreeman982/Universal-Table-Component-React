import { Header } from '@/components/atoms/Header/Header';
import { Footer } from '@/components/atoms/Footer/Footer';
import { Informer } from '@/components/atoms/Informer/Informer';

export const Page = ({ children, error }) => {
    return (
        <>
            <Header />
            <main className="px-2 py-12">
                {error && <Informer textError={error} />}
                {children}
            </main>
            <Footer />
        </>
    );
};
