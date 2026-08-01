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
