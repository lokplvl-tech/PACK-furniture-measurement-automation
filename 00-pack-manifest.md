---
pack_id: FMA
pack_name: "Автоматизация замера в параметрическую модель мебели"
pack_id_slug: furniture-measurement-automation
pack_id_code: FMA
name_status: provisional
sota_sources: grounded
created: 2026-08-01
wp: 36
---

# Паспорт Пака: Автоматизация замера в параметрическую модель мебели

**Домен:** мост между реальным замером помещения (метод трёх точек) и параметрической моделью мебели в семействе САПР «Базис» - через собственный скриптовый API Базиса (`BAZIS-Script`) и оркестрацию со стороны Перфоленты. НЕ дублирует сам метод P2W (`FE.M.001`, `PACK-furniture-engineering`) - берёт его позицию 1 (Claim Scope, замер) как вход, и производит параметрический скрипт как выход.

**Контекст:** РП36, часть более широкой технической базы (WP-34, `PACK-perfolenta-development`) и мебельного направления (WP-7, `PACK-furniture-engineering`).

## Entity Index

| Код | Название | Файл |
|-----|----------|------|
| FMA.D.001 | Скрипт Базиса как параметрическая функция vs готовая модель | `01-domain-contract/01B-distinctions.md` |
| FMA.M.001 | Устройство BAZIS-Script (по реальному примеру) | `03-methods/FMA.M.001.md` |
| FMA.M.002 | Словарь API BAZIS-Script (по официальному разбору примера) | `03-methods/FMA.M.002.md` |
| FMA.M.003 | Роли и инструментарий: замерщик / проектировщик / дизайнер-конструктор (SoTA по G.2) | `03-methods/FMA.M.003.md` |
| FMA.GRD.001 | Данные объявлены после вызова MakeProperties()/Action.Properties.Load() | `05-failure-modes/FMA.GRD.001.md` |
| FMA.GRD.002 | Перепутан порядок y1/y2 в AddFrontPanel - не ошибка, а перекос | `05-failure-modes/FMA.GRD.002.md` |
| FMA.GRD.003 | Пятый параметр AddFrontPanel - положение по глубине, не толщина панели | `05-failure-modes/FMA.GRD.003.md` |
| FMA.M.004 | RAG-подсказчик дизайнера-конструктора: обещание, сценарии, режим отказа (IntegrationGate, черновик) | `03-methods/FMA.M.004.md` |
| FMA.R.001 | Дизайнер-конструктор (роль) | `02-domain-entities/01B-roles.md` |
| FMA.M.005 | CGUS - таблица допустимых продолжений (узор → приём кода → проверки → граница) | `03-methods/FMA.M.005.md` |
