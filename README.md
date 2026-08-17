# The Beads Bar — demo-webshop

Demo van een kralenwebshop met TikTok-funnel, gebouwd om te laten zien wat er
kan. Roze huisstijl uit de logo-mockups, alles beweegt zachtjes, en de hele
verkooppsychologie zit erin.

## Starten

```bash
npm install
npm run dev
```

Daarna staat de shop op http://localhost:3000.

## Wat zit erin

| Pagina | Wat je er ziet |
|---|---|
| `/` | Homepage: hero met bewegende gradient, categorieën, nieuw binnen, deal van de dag met aftelklok, TikTok-sectie, reviews |
| `/shop` | Alle producten, filteren per categorie, zoeken |
| `/product/<naam>` | Productpagina met staffelkorting (3 halen = 10%), voorraad-teller, kijkers-teller, reviews en "vaak samen gekocht" |
| `/t/pen-pov` (en 3 andere) | TikTok-landingspagina's: één per video, zonder afleidend menu, deal uit de video, korting automatisch toegepast |
| `/checkout` | One-page checkout: reserverings-timer, kortingscodes, order bump (cadeauverpakking), last-minute Mystery Bag |
| `/bedankt` | Bedankt-pagina met confetti en een eenmalige upsell met 1 tik |
| `/admin` | Dashboard: omzet, conversie, funnel-statistieken per TikTok-video, bestellingen, voorraad-alerts |

Kortingscodes in de demo: `BEADS10` (nieuwsbrief-popup) en `TIKTOK15` (funnels).

## De verkooppsychologie die erin zit

1. **Gratis verzending vanaf €50** met voortgangsbalk in het mandje (mensen
   vullen hun mandje aan om de drempel te halen)
2. **Staffelkorting** op de productpagina (3× = -10%, 5× = -20%): hogere
   gemiddelde bestelwaarde
3. **Schaarste**: "nog 7 op voorraad" bij lage voorraad
4. **Urgentie**: aftelklokken op deals en een reserverings-timer op de checkout
5. **Social proof**: "Emma uit Utrecht kocht zojuist..."-meldingen, reviews
   met plaatsnaam, "23 mensen bekijken dit nu"
6. **Prijsanker**: doorgestreepte van-prijzen met bespaar-percentage
7. **Order bump**: cadeauverpakking (+€1,95) als vinkje op de checkout
8. **Post-purchase upsell**: na het betalen één aanbod met 1 tik, "gaat mee
   in dezelfde doos" (geen tweede verzending als excuus om ja te zeggen)
9. **Cadeautje bij elke bestelling** (wederkerigheid, en leuk om te unboxen
   voor TikTok)
10. **Funnel per video**: elke TikTok-video linkt naar z'n eigen pagina met
    precies die deal, zonder menu. In het admin-dashboard zie je per video
    views, kliks, mandjes en bestellingen
11. **Welkomstpopup** met 10% korting (e-mailadressen verzamelen)
12. **Frictie laag houden**: mandje als zijlade, checkout op één pagina,
    iDEAL vooraan

## Wat is echt en wat is demo

- **Echt**: de hele voorkant, het mandje (onthouden in je browser), de
  kortingscodes, de staffel-berekeningen, alle animaties.
- **Demo**: de betaling (er wordt niks afgerekend), de bestellingen en
  statistieken in het admin-dashboard (voorbeeldcijfers), de
  productafbeeldingen (getekend in code, te vervangen door echte foto's).

## Wat er nodig is om hier een echte shop van te maken

- Betalingen via Mollie (iDEAL) of Stripe
- Database (Supabase) voor producten, voorraad en bestellingen
- Echte productfoto's (de illustraties zijn placeholders)
- TikTok Pixel + UTM-links zodat de funnel-cijfers echt gemeten worden
- Verzendkoppeling (bijv. MyParcel of Sendcloud) voor etiketten
- E-mails (bevestiging, verzonden, mandje-verlaten) via bijv. Resend
- Juridisch: algemene voorwaarden, privacyverklaring, retourbeleid

Gebouwd met Next.js 16, Tailwind v4. Demo staat op noindex.
