# Preorder Fishki Premium - checklista publikacji landingu

Przedmiotem sprzedaży jest preorder 12 miesięcy Fishki Premium od publicznej premiery. Zamknięte testy beta są opcjonalnym, bezpłatnym zaproszeniem dla kupujących. Przed publikacją należy przejść pełny test zakupowy i sprawdzić komunikację we wszystkich miejscach.

## 1. Zamknięta beta w App Store Connect

- [ ] Otworzyć `App Store Connect → Fishki → TestFlight` i wybrać najnowszy build.
- [ ] Uzupełnić pytanie o szyfrowanie / export compliance.
- [ ] Utworzyć zewnętrzną grupę `Preorder Beta`.
- [ ] Dodać build do grupy.
- [ ] Uzupełnić opis wersji beta, zakres testów, e-mail kontaktowy i dane konta dla App Review.
- [ ] Wysłać build do Beta App Review.
- [ ] Nie tworzyć publicznego linku TestFlight.

## 2. Opcjonalne zaproszenie kupującego do testów

- [ ] Jeśli Fishki zdecyduje o zaproszeniu kupującego, po akceptacji bety dodać jego adres do grupy `Preorder Beta`.
- [ ] Użyć tego samego adresu, który został podany przy zakupie.
- [ ] Dopilnować, aby konto Fishki zostało utworzone na ten sam adres.
- [ ] Sprawdzić osobno zaproszenie do instalacji i grant dostępu w bazie - wymagane są oba.

## 3. Pełny test zakupowy

- [ ] Kupić preorder na osobny testowy adres.
- [ ] Potwierdzić odpowiedź `200` webhooka Stripe.
- [ ] Potwierdzić zmianę preorderu na `PAID`.
- [ ] Potwierdzić utworzenie grantu `PREORDER`.
- [ ] Jeśli kupujący ma brać udział w bezpłatnych testach beta, wysłać prywatne zaproszenie TestFlight.
- [ ] Utworzyć konto Fishki na adres użyty przy zakupie.
- [ ] Dla zaproszonego kupującego potwierdzić dostęp do aplikacji.
- [ ] Potwierdzić, że konto bez zaproszenia nie może korzystać z zamkniętej bety.
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

## 6. Treści, płatność i dokumenty przed publikacją

- [ ] Zweryfikować, że nagłówki, CTA, formularz, FAQ i strona podziękowania wskazują preorder 12 miesięcy Premium od publicznej premiery.
- [ ] Sprawdzić, że beta jest opisana wyłącznie jako możliwe, bezpłatne zaproszenie, bez obietnicy dostępu po płatności.
- [ ] Zarchiwizować obecną wersję regulaminu preorderu.
- [ ] Opublikować nową wersję regulaminu z preorderem subskrypcji jako przedmiotem umowy.
- [ ] Zweryfikować politykę prywatności, Warunki użytkowania i tekst strony podziękowania.
- [ ] W katalogu Stripe zmienić nazwę istniejącego produktu na `Fishki Premium - preorder 12 months from public launch`, zachowując obecny Price ID i kwoty.
- [ ] Sprawdzić nazwę produktu, opis, dodatkowy tekst i potwierdzenie płatności w Stripe Checkout dla PL, EUR i USD.
- [ ] Sprawdzić opis płatności w PayByLink, jeśli ten operator jest włączony.
- [ ] Sprawdzić gotowe wiadomości e-mail poniżej oraz ustawienia potwierdzenia płatności u operatora.
- [ ] Pozostawić publiczną sprzedaż dopiero po pełnym teście z sekcji 3.

### Wiadomości dla kupujących

Potwierdzenie preorderu, jeśli jest wysyłane osobno od potwierdzenia operatora płatności:

**Temat:** Potwierdzenie preorderu 12 miesięcy Fishki Premium

**Treść:** Dziękujemy za preorder Fishki Premium. Twoja jednorazowa płatność dotyczy 12-miesięcznej subskrypcji, która rozpocznie się w dniu publicznej premiery. Informację o starcie Premium wyślemy na adres użyty przy zakupie. Jeśli Fishki nie wystartują publicznie do 31 marca 2027 roku, możesz zażądać pełnego zwrotu w ciągu dwóch kolejnych miesięcy. Przed premierą możemy dodatkowo zaprosić Cię bezpłatnie do zamkniętych testów beta; zaproszenie nie jest gwarantowane i nie stanowi części zakupionej subskrypcji.

Opcjonalne zaproszenie do testów beta:

**Temat:** Bezpłatne zaproszenie do zamkniętych testów Fishki

**Treść:** Zapraszamy Cię do bezpłatnych, zamkniętych testów beta Fishki. Udział jest dobrowolny i odrębny od Twojego preorderu. Zakupione 12 miesięcy Fishki Premium rozpocznie się w dniu publicznej premiery niezależnie od udziału w testach. Instrukcja instalacji: [uzupełnij link dla wybranej platformy].

English purchase confirmation: **Subject:** Your 12-month Fishki Premium preorder. **Body:** Thank you for preordering Fishki Premium. Your one-time payment is for a 12-month subscription beginning on the public launch date. We will email you when Premium starts. If Fishki has not launched publicly by March 31, 2027, you may request a full refund within the following two months. Before launch, we may also invite you to free private beta testing. An invitation is not guaranteed and is separate from your purchase.

English optional invitation: **Subject:** Free invitation to Fishki private beta testing. **Body:** You are invited to take part in free, private Fishki beta testing. Participation is voluntary and separate from your preorder. Your purchased 12 months of Fishki Premium will start on the public launch date regardless of whether you test the beta. Installation instructions: [insert the link for your platform].

## 7. Kontrola techniczna

- [ ] Testy automatyczne landingu przechodzą w komplecie.
- [ ] Produkcyjny build landingu przechodzi.
- [ ] Zakup działa w wersji polskiej i angielskiej oraz dla wszystkich regionów cenowych.
- [ ] Strona jest sprawdzona na telefonie, tablecie i desktopie.
- [ ] Linki prawne, formularz aktualności, płatność i strona podziękowania działają.
- [ ] Dopiero wtedy wykonać produkcyjne wdrożenie i szerzej udostępnić sprzedaż.
