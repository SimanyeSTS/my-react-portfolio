import data from "./data";
import FAQ from "./FAQ";
import "./faqs.css";

const FAQs = () => {
  return (
    <section id="faqs">
      <h2>Frequently Asked Questions</h2>
      <p>
        Here are some questions I usually get. Feel free to reach out with
        anything else you're curious about. I'm always happy to help!
      </p>
      <div className="container faqs__container" data-aos="fade-in">
        {data.map((faq) => (
          <FAQ key={faq.id} faq={faq} />
        ))}
      </div>
    </section>
  );
};

export default FAQs;