// Produktakkordeon – viser produktbeskrivelse, materialer, certificeringer og leveringsinformation i foldbare sektioner.
// Første sektion er åben som standard. Flere sektioner kan være åbne samtidig.
import { useState } from "react";
import styles from "./DetailInfoBox.module.css";

export default function DetailAccordion({ product }) {
  const [open, setOpen] = useState([0]); // Første sektion åben som default

  const handleToggle = (idx) => {
    setOpen(
      (prev) =>
        prev.includes(idx)
          ? prev.filter((i) => i !== idx) // Luk hvis allerede åben
          : [...prev, idx], // Ellers åbn
    );
  };

  const materialDescriptions = {
    Merinould:
      "Merinould er en naturlig fiber, der er blød, temperaturregulerende og åndbar. Den er ideel til børn, da den ikke kradser og hjælper med at holde huden tør og komfortabel.",
    "Økologisk bomuld":
      "Økologisk bomuld dyrkes uden brug af skadelige kemikalier og pesticider. Det er et blødt, allergivenligt materiale, der er skånsomt mod både huden og miljøet.",
    Bomuld:
      "Bomuld er et klassisk, blødt og åndbart materiale, der er nemt at vaske og behageligt at have på.",
    "Uld & silke":
      "Uld & silke kombinerer det bedste fra begge materialer: uldens varme og silkens blødhed. Det giver et let, temperaturregulerende og luksuriøst produkt.",
    "Merinould fleece":
      "Merinould fleece er ekstra blød og varm, perfekt til kolde dage. Det er let, åndbart og holder barnet komfortabelt.",
    Uld: "Uld er et naturligt materiale, der isolerer godt og holder kroppen varm, selv når det er fugtigt.",
    Polyester:
      "Polyester er et slidstærkt og let syntetisk materiale, der ofte bruges til overtøj og sportstøj.",
    "Genanvendt polyester":
      "Genanvendt polyester er fremstillet af genbrugte plastmaterialer, hvilket gør det til et mere bæredygtigt valg.",
    Læder:
      "Læder er et robust og fleksibelt materiale, der giver god beskyttelse og komfort til sko og accessories.",
    Naturgummi:
      "Naturgummi er et naturligt, elastisk materiale, der bruges til gummistøvler og giver god fleksibilitet og vandtæthed.",
    "Læder & uld":
      "Læder & uld kombinerer læderets holdbarhed med uldens varme, ideelt til sko og støvler til børn.",
    "THERMOLITE® EcoMade-polstring":
      "THERMOLITE® EcoMade-polstring er en innovativ isolering, der holder barnet varmt og er fremstillet af genanvendte materialer.",
    "BIONIC-FINISH® ECO":
      "BIONIC-FINISH® ECO er en miljøvenlig imprægnering, der gør tekstiler vandafvisende uden skadelige kemikalier.",
    "100 % uldfleece":
      "100 % uldfleece er utroligt blødt og varmt, perfekt til vintertøj og accessories til de mindste.",
    "Bomulds denim":
      "Bomulds denim er et slidstærkt og alsidigt materiale, der er perfekt til jeans og jakker.",
  };

  const sections = [
    { title: "Beskrivelse", content: product.description },
    {
      title: "Materialer",
      content: materialDescriptions[product.materiale] || product.materiale,
    },
    {
      title: "Certificeringer",
      content:
        "Vores produkter er fremstillet med omtanke for både miljø og mennesker. Vi benytter materialer, der er certificeret efter internationale standarder som OEKO-TEX® og GOTS, hvilket sikrer, at tekstilerne er fri for skadelige kemikalier og produceret under ansvarlige forhold. Certificeringerne garanterer høj kvalitet, bæredygtighed og tryghed for dig og dit barn.",
    },
    {
      title: "Levering",
      content: "Leveringstid er 1-2 hverdage. Altid gratis levering.",
    },
  ];

  return (
    <div className={styles.accordion}>
      {sections.map((section, idx) => (
        <div className={styles.accordionItem} key={idx}>
          <button
            className={`${styles.accordionButton} ${open.includes(idx) ? styles.open : ""}`}
            onClick={() => handleToggle(idx)}
          >
            <h4 className={styles.accordionTitle}>{section.title}</h4>
          </button>
          {open.includes(idx) && (
            <div className={`${styles.accordionContent} ${styles.open}`}>
              <p className={styles.accordionText}>
                {section.content.split(". ").map((sentence, i) =>
                  i < section.content.split(". ").length - 1 ? (
                    <span key={i}>
                      {sentence}.<br />
                    </span>
                  ) : (
                    <span key={i}>{sentence}</span>
                  ),
                )}
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
