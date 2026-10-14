# Biuro Rachunkowe Bućko — wersja GitHub Pages

## Publikacja
1. Zaloguj się do GitHub i utwórz nowe **publiczne** repozytorium, np. `biuro-bucko`.
2. Prześlij **zawartość tego folderu** do katalogu głównego repozytorium (nie sam folder).
3. Wejdź do **Settings → Pages**. W **Build and deployment** ustaw **Deploy from a branch**, gałąź **main** i katalog **/(root)**, następnie **Save**.
4. Po opublikowaniu wejdź na `https://TWOJ-LOGIN.github.io/biuro-bucko/` (zamień TWOJ-LOGIN na login GitHub). Pierwsze wdrożenie może potrwać kilka minut.

## Edycja tekstów
1. Otwórz w repozytorium `teksty.txt` i kliknij ikonę ołówka.
2. Zmieniaj **tylko wartości po dwukropku** w cudzysłowach. Zachowaj strukturę JSON, przecinki i klucze.
3. Wybierz **Commit changes**. GitHub Pages opublikuje aktualizację.
4. Odśwież stronę. Skrypt `teksty.js` pobiera plik `teksty.txt` przy otwieraniu każdej podstrony.

Przykład wpisu: `"010 | Zaufanie budowane od 1993 roku": "Nowy nagłówek"`.

**Uwaga:** Teksty osadzone w grafice banera nie zmienią się po edycji TXT. Zmiana widocznego numeru telefonu / adresu e-mail nie aktualizuje automatycznie odnośników `tel:` i `mailto:`. Plik TXT jest publiczny — nie wpisuj do niego danych poufnych. Przeglądarka otwierająca lokalne pliki `file://` może zablokować `fetch`, dlatego testuj wersję przez GitHub Pages.

## Diagnostyka
- Jeśli widać stronę 404: sprawdź nazwę repozytorium, gałąź main, katalog root i czas wdrożenia.
- Jeśli tekst się nie aktualizuje: sprawdź, czy JSON w `teksty.txt` jest poprawny oraz czy commit został opublikowany.
- Wszystkie pliki HTML, CSS, JS i obrazy powinny znajdować się razem w katalogu głównym.
