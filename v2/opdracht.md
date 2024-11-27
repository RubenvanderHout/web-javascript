 Algemeen:
De eindopdracht is het analyseren, ontwerpen en realiseren van een simulatie applicatie, gebruikmakend van Javascript. Je maakt geen gebruik van externe frameworks, packages of modules. Met andere woorden: je schrijft alles zelf. 
Je maakt de eindopdracht in duo's. Voor week 4 maak je een duo. Lukt dat niet, geef je docent dan even een seintje dan kijken we wat we kunnen doen.
Inschrijven voor het assessment komt ter zijner tijd online en wordt gemeld via de announcements.
Future Color:
Future Color is bedrijf dat met zo min mogelijk chemicaliën verf wil maken.
Men wil graag een kleuren/meng simulator met een intuïtieve interface (met drag en drop)
Maak een applicatie die de volgende aspecten heeft:
Je kan verschillende 'ingredienten' dynamisch genereren met de volgende aspecten
- minimale mengtijd in milliseconden
- mengsnelheid
- kleur
- structuur: Korrel, grove korrel, glad, slijmerig
Op het moment dat je het ingredient gemaakt hebt, verschijnt het op het scherm. Ieder ingredient heeft een eigen vorm (zelf te bepalen). Je maakt -geen- gebruik van afbeeldingen!
Je kan meerdere lege potten dynamisch aanmaken
Je kan ingredienten in de verschillende potten 'slepen', alleen ingredienten met dezelfde mengsnelheid kunnen bij elkaar.
Je kan meerdere mengmachines aanmaken met verschillende instellingen (mengsnelheid/mengtijd)
Je kan een pot de mengmachine plaatsen door middel van drag en drop.
Potten die in de mengmachine worden geplaatst komen automatisch 'aan de andere kant' er weer uit na de hoogste mengtijd van een ingredient
Er is een animatie aanwezig (zelf te bepalen)
Er zijn twee Menghallen beschikbaar waar je machines kan plaatsen en afzonderlijk werken. Je kan wisselen tussen de hallen zonder dat de pagina opnieuw wordt geladen. 
In de menghallen kan je dus meerdere machines maken, maar de ingredienten niet. Deze zijn altijd zichtbaar
Afhankelijk van het weer (via API aanroepen) zal de mengtijd hoger/lager zijn. Maak een oplossing dat je makkelijk de stad/locatie van het filiaal waar de verf wordt gemengd kan aanpassen. Hierdoor kan je makkelijk van weertype wisselen. 

    Als het regent of sneeuwt 10% meer mengtijd.
    Als het boven de 35 graden mag er maximaal 1 mengmachine draaien.
    Onder de 10 graden 15% langer mengen.

Er is een kleurentest pagina aanwezig waarbij de gebruiker zelf een grid kan genereren van bijvoorbeeld 6x6 vierkantjes.
Deze vierkantjes kan je dan 'vullen' met de gemengde verf en zo verschillen zien tussen de gevulde vierkantjes.
Als de gebruiker op een kleur klikt, krijg je twee andere kleuren te zien volgens het https://en.wikipedia.org/wiki/Color_scheme#Triadic Triadic color scheme principe.
ter voorbeeld (bron bovenstaande link)