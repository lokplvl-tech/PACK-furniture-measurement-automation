# PACK-furniture-measurement-automation

Source-of-truth для домена: мост между замером помещения и параметрической моделью мебели в САПР «Базис» через `BAZIS-Script`.
Структура: SPF/pack-template. Upstream: FPF, SPF.

При работе с этим Pack: читать 00-pack-manifest.md для навигации.

Первоисточники: `C:\Users\Фёдор\Documents\Базис\` (документация, готовый рабочий пример скрипта `Example\Моя первая тумбочка 2.js`), официальная документация `https://cdn.bazissoft.ru/documentation/ru/BAZIS-Script_functions.html`. Пример файла - реальная, боевая работа, не учебный пример - сверяться с ним, не додумывать API.

Пока `name_status: provisional`: каждое новое различение в `01-domain-contract/01B-distinctions.md` получает заголовок `### {{PACK_ID}}.D.NNN: <Название>`.
