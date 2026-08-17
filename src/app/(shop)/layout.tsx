import AnnouncementBar from "@/components/AnnouncementBar";
import CartDrawer from "@/components/CartDrawer";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import NewsletterPopup from "@/components/NewsletterPopup";
import SocialProofToast from "@/components/SocialProofToast";

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AnnouncementBar />
      <Header />
      <main>{children}</main>
      <Footer />
      <CartDrawer />
      <SocialProofToast />
      <NewsletterPopup />
    </>
  );
}
