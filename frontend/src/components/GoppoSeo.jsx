import React from "react";
import { Helmet } from "react-helmet-async";

function GoppoSeo() {
  return (
    <>
      <Helmet>
        <title>
          Goppo - Free Bengali Chat App | Social Chat with Friends & Strangers
        </title>
        <meta
          name="description"
          content="Connect with friends or chat anonymously on Goppo, the free Bengali chat app. Make new friends, find chat partners for gf/bf conversations, or enjoy social chatting with anyone."
        />
        <meta
          name="keywords"
          content="Goppo, golpo, Bengali chat, chatapp, free chat, social chat, gf chat, bf chat, anonymous chat, stranger chat, online chat, messaging app"
        />
        <meta
          property="og:title"
          content="Goppo - Free Bengali Chat App | Social Chat with Friends & Strangers"
        />
        <meta
          property="og:description"
          content="Connect with friends or chat anonymously on Goppo, the free Bengali chat app. Make new friends and enjoy social chatting."
        />
        <meta
          property="og:image"
          content="https://goppo.onrender.com/images/goppo-social.jpg"
        />
        <meta property="og:url" content="https://goppo.onrender.com/" />
        <link rel="canonical" href="https://goppo.onrender.com/" />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* Schema.org markup */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Goppo Chat App",
            description:
              "Free Bengali social chat application for making friends and anonymous conversations",
            image: "https://goppo.onrender.com/images/goppo-social.jpg",
            url: "https://goppo.onrender.com/",
            applicationCategory: "CommunicationApplication",
            operatingSystem: "Web, Android, iOS",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "USD",
            },
          })}
        </script>
      </Helmet>
    </>
  );
}

export default GoppoSeo;
