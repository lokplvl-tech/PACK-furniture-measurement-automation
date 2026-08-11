## YAML Frontmatter

```yaml
---
id: FMA.GRD.001
name: Данные объявлены после вызова MakeProperties()/Action.Properties.Load()
category: script-failure
severity: major
status: active
summary: "Массивы верхнего уровня (var), используемые внутри Prop.OnChange, объявлены ПОСЛЕ вызова MakeProperties()/Action.Properties.Load() - в момент первого срабатывания обработчика они ещё undefined"
created: 2026-08-06
last_updated: 2026-08-06
related:
  affects_method: [FMA.M.001, FMA.M.002]
  affects_wp: [36]
  confused_distinction: []
tags: [guard, порядок-выполнения, hoisting, prop-onchange]
---
```

---

## [FMA.GRD.001] Данные объявлены после вызова MakeProperties()/Action.Properties.Load()

### Definition

Скрипт объявляет вспомогательные данные (`var Widths = [...]`, `var Names = [...]`) НИЖЕ по файлу, чем строки `MakeProperties(); Action.Properties.Load(FileOptions);` - а `Prop.OnChange` (заданный внутри `MakeProperties()`) ссылается на эти данные. `Action.Properties.Load` может синхронно вызывать `Prop.OnChange` сразу при загрузке сохранённых настроек - раньше, чем JS-движок успевает выполнить строку с фактическим присваиванием массива (hoisting поднимает объявление `var`, но не присваивание).

### Category

**This failure mode is**: `script-failure` - структурная ошибка порядка исполнения BAZIS-Script, не ошибка домена мебели.

### Observable Symptoms

- [ ] При первом открытии скрипта в Базисе - `TypeError: Cannot read property 'length' of undefined` (или похожая) на строке внутри `Prop.OnChange`
- [ ] Ошибка возникает ДО того, как пользователь успел что-то ввести в окне параметров

### Root Causes

| Cause | Description |
|-------|-------------|
| Перенос привычки из обычных JS-модулей | В браузерном/Node.js коде порядок объявлений часто не критичен из-за модульной изоляции; в среде скрипта Базиса это не так |
| Реальный боевой пример не создаёт этой ловушки | «Моя первая тумбочка 2.js» не имеет отдельных top-level массивов, используемых `Prop.OnChange` до их присвоения - все данные создаются внутри самой `MakeProperties()` |

### Consequences

- Скрипт не открывается вообще - падает сразу, окно параметров не появляется
- Ошибка неочевидна по тексту (говорит про `length`, не про порядок объявления)

### Related Items

| Type | Item | Relationship |
|------|------|--------------|
| Method | [FMA.M.001](../03-methods/FMA.M.001.md) | структура типового скрипта - здесь уточнение по порядку строк |
| Method | [FMA.M.002](../03-methods/FMA.M.002.md) | `Prop.OnChange` как обработчик - здесь его реальная ловушка |

### Guard (блокирующий инвариант)

Все данные верхнего уровня, на которые ссылается `Prop.OnChange` или сама `MakeProperties()`, объявляются и заполняются строго ДО строк `MakeProperties(); Action.Properties.Load(...)`.

### Detection Methods

| Detection Method | When to Apply |
|--------------------|----------------|
| Ручной просмотр порядка строк перед первым запуском в Базисе | Перед передачей скрипта на реальный прогон |
| `node --check` не ловит эту ошибку (синтаксис верный) - только реальный запуск в Базисе или ручной анализ порядка | На этапе подготовки скрипта |

### Notes

Найдено на реальном прогоне 06.08.2026 (заказ кухни, `RS-GROUP-Kuhnya-Evg-eskiz.js`) - первая версия скрипта с массивом ширин фасадов, объявленным в конце файла.

---

## Checklist Before Committing

- [x] ID follows pattern `FMA.GRD.NNN`
- [x] Category specified
- [x] Observable symptoms are specific
- [x] Related items are linked
- [ ] Added to `07-map/`
