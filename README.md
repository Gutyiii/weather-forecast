
-----------#######-----------
-----------------------------
-----------Útmutaó-----------
-----------------------------
-----------#######-----------

0.: Szükség van egy node.js-re, ezt le lehet tölteni a node.js oldaláról: https://nodejs.org/en/download/package-manager 

1.: Szükség van egy console-re, vs code-on belűl ctrl+shift+ö a gyorsbillenytű parancs

2.: A console-ba be kell írni hogy "npm install", ezzel bekerül a projekt gyökerébe egy node_module mappa és felkerülnek a függőségek

3.: A console-ba miután lefutott az előző parancs be kell írni hogy "npm start", ezzel elindul a projekt a böngészőbe

4.: A felső input mezőbe be kell írni egy várost például "Budapest" és rányomni a "Keresés" gombra

5.: Az oldal nem tölt sokat szóval nincs szükség loading layer-ek bevezetésére,
    ezt követően a "Kérlek válassz egy várost" felirat eltűnik és megjelenik
    az aktuális város neve, hőmérséklete, állapot ikona bal oldalt,
    a kiválasztott városuk 7 napos előrejelzése minimum és maximum hőmérséklettel, csapadék előrejelzése egy hétre előre 
    és a chart alatta.

6.: Ha állítjuk az input melletti selectet, aminek az alap értéke 1, jelen esetben 20 elég Budapest-nél,
    akkor megjelenik egy modal, amiből ki tudjuk választani, hogy pontosan Budapest melyik részére vagyunk kíváncsiak,
    amik közül az API lehetőséget biztosít.
    Miután kiválasztottuk melyiket szeretnénk látni, rákattintuk, 
    a modal bezáródik és betölti az adott választásra vonatkozó adatokat.

