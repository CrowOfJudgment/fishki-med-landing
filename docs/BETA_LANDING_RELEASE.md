# Fishki beta - checklista publikacji landingu

Nowej wersji landingu nie publikujemy, dopóki prywatne testy nie są dostępne na iOS i Androidzie oraz nie przejdzie pełny test zakupowy.

## 1. Zamknięta beta w App Store Connect

- [ ] Otworzyć `App Store Connect → Fishki → TestFlight` i wybrać najnowszy build.
- [ ] Uzupełnić pytanie o szyfrowanie / export compliance.
- [ ] Utworzyć zewnętrzną grupę `Preorder Beta`.
- [ ] Dodać build do grupy.
- [ ] Uzupełnić opis wersji beta, zakres testów, e-mail kontaktowy i dane konta dla App Review.
- [ ] Wysłać build do Beta App Review.
- [ ] Nie tworzyć publicznego linku TestFlight.

## 2. Dostęp kupującego

- [ ] Po akceptacji bety dodać adres kupującego do grupy `Preorder Beta`.
- [ ] Użyć tego samego adresu, który został podany przy zakupie.
- [ ] Dopilnować, aby konto Fishki zostało utworzone na ten sam adres.
- [ ] Sprawdzić osobno zaproszenie do instalacji i grant dostępu w bazie - wymagane są oba.

## 3. Pełny test zakupowy

- [ ] Kupić preorder na osobny testowy adres.
- [ ] Potwierdzić odpowiedź `200` webhooka Stripe.
- [ ] Potwierdzić zmianę preorderu na `PAID`.
- [ ] Potwierdzić utworzenie grantu `PREORDER`.
- [ ] Wysłać prywatne zaproszenie TestFlight.
- [ ] Utworzyć konto Fishki na adres użyty przy zakupie.
- [ ] Potwierdzić dostęp kupującego do aplikacji.
- [ ] Potwierdzić, że konto bez zakupu nie może korzystać z zamkniętej bety.
- [ ] Potwierdzić, że ponowna próba zakupu na ten sam adres pokazuje informację o istniejącym preorderze.

## 4. Android

- [ ] Przygotować dystrybucję zamkniętej bety na Androidzie.
- [ ] Potwierdzić instalację i dostęp konta kupującego.
- [ ] Przejść ten sam krytyczny scenariusz zakupu, logowania i synchronizacji co na iOS.

## 5. Prawdziwe materiały z aplikacji

Nie publikować atrap jako prawdziwych zrzutów. Interaktywny podgląd na stronie może pozostać podpisany jako podgląd, ale sekcja „aplikacja w działaniu” ma używać nagrań z aktualnego buildu.

Minimalny komplet:

- [ ] `01-study-today` - ekran Nauka i dzisiejszy plan.
- [ ] `02-smart-review` - gest oceniania w inteligentnych powtórkach.
- [ ] `03-card-editor` - edytor tekstu, obrazu i luk.
- [ ] `04-exam-plan` - wydarzenie oraz prognoza przygotowania.
- [ ] `05-import` - import talii i ekran zatwierdzania kart.
- [ ] Jedno krótkie nagranie (6-12 s) pokazujące utworzenie lub import karty i rozpoczęcie nauki.

Zalecenia:

- zrzuty bez danych osobowych, prawdziwych adresów e-mail i systemowych powiadomień;
- spójny model urządzenia i język w ramach jednej wersji strony;
- PNG/WebP dla ekranów, MP4 (H.264, bez dźwięku) dla nagrań; GIF tylko jako awaryjny fallback;
- pokazać produkt w normalnym użyciu, bez ekranów testowych, błędów i pustych danych;
- przygotować osobne teksty alternatywne po polsku i angielsku.

## 6. Treści i dokumenty przed publikacją

- [ ] Zweryfikować, że wszystkie komunikaty mówią o działającej becie i aktualnie dostępnych platformach.
- [ ] Zarchiwizować obecną wersję regulaminu preorderu.
- [ ] Opublikować nową wersję regulaminu opisującą faktyczną dostępność bety i sposób dostarczenia dostępu.
- [ ] Zweryfikować politykę prywatności, Warunki użytkowania i tekst strony podziękowania.
- [ ] Pozostawić publiczną sprzedaż dopiero po pełnym teście z sekcji 3.

## 7. Kontrola techniczna

- [ ] Testy automatyczne landingu przechodzą w komplecie.
- [ ] Produkcyjny build landingu przechodzi.
- [ ] Zakup działa w wersji polskiej i angielskiej oraz dla wszystkich regionów cenowych.
- [ ] Strona jest sprawdzona na telefonie, tablecie i desktopie.
- [ ] Linki prawne, formularz aktualności, płatność i strona podziękowania działają.
- [ ] Dopiero wtedy wykonać produkcyjne wdrożenie i szerzej udostępnić sprzedaż.
