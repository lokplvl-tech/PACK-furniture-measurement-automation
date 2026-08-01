# Тип репозитория

**Тип**: `Pack`
**Source-of-truth**: yes

## Область
Интеграция реального замера помещения с параметрическим скриптовым API САПР «Базис» (`BAZIS-Script`), оркестрация со стороны Перфоленты.

## Upstream dependencies
- [TserenTserenov/SPF](https://github.com/TserenTserenov/SPF) - Second Principles Framework
- [ailev/FPF](https://github.com/ailev/FPF) - First Principles Framework

## Non-goals
- НЕ дублирует метод P2W (`FE.M.001`) - берёт его позицию 1 (замер) как вход, не переопределяет весь метод.
- НЕ дублирует общие знания о Перфоленте (`PACK-perfolenta-development`) - ссылается на них.
- НЕ содержит кода реальной интеграции (это будущая реализация, не Pack).
