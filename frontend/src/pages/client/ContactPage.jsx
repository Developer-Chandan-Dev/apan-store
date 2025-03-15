import Header from "../../components/client/Header";
import Footer from "../../components/client/Footer";
import ContactInfoBox from "../../components/client/contact/ContactInfoBox";
import FrequentlyAskedQuestions from "../../components/client/contact/FrequentlyAskedQuestions";
import ContactUsForm from "../../components/client/contact/ContactUsForm";

const ContactPage = () => {
  return (
    <div className="w-full h-auto">
      <Header bg="bg-[#f8f6f3]" />
      <div className="py-10 px-10 bg-[#f8f6f3] flex items-start justify-center h-72">
        <h1 className="text-6xl font-bold amiri-quarn mt-5">Get In Touch</h1>
      </div>

      <div className="w-full px-5 sm:px-10 py-20 h-auto bg-white accordianBlock">
        <ContactInfoBox />
        <FrequentlyAskedQuestions />
        <ContactUsForm/>
      </div>

      <Footer />
    </div>
  );
};

export default ContactPage;
