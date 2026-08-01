// Шкаф 2 (справа) - черновой скрипт BAZIS-Script
// Габариты: 750 x 450 x 2200 мм, шаг полок ~350 мм, эластичный блок (полки пересчитываются при смене высоты)
// НЕ ПРОВЕРЕНО В САМОЙ ПРОГРАММЕ БАЗИС - черновик по словарю API (FMA.M.002), открыть и визуально сверить
// Схема сборки (моё допущение, не подтверждено против настроек пилота):
//   стойки (левая/правая) - на всю высоту, дно и крышка - вкладные между стойками, полки - тот же принцип
// Исправление (01.08.2026): Prop.NewNumber вызывается напрямую у Prop, не у группы -
//   первая версия падала на Group.NewNumber(...), такой функции нет в словаре API

function MakeProperties() {
    Prop = Action.Properties; // честная поправка (01.08.2026): Prop - не встроенная переменная, её нужно объявить самому

    Width = Prop.NewNumber('Ширина', 750);
    Depth = Prop.NewNumber('Глубина', 450);
    Height = Prop.NewNumber('Высота', 2200);

    var MatGroup = Prop.NewGroup('Материалы');
    Mat = MatGroup.NewMaterial('Плита корпуса');
    Thickness = Prop.NewNumber('Толщина плиты', 16);
    Butt = MatGroup.NewButt('Кромка');

    ShelfSpacing = Prop.NewNumber('Целевой шаг полок', 350);

    Prop.OnChange = function () {
        Make();
    };
}

function Make() {
    DeleteNewObjects();

    var W = Width.Value;
    var D = Depth.Value;
    var H = Height.Value;
    var T = Thickness.Value;
    var targetSpacing = ShelfSpacing.Value;

    // --- Стойки (левая и правая), на всю высоту ---
    var LeftSide = AddVertPanel(0, 0, H, D, 0);
    LeftSide.Name = 'Стойка левая';
    LeftSide.AddButt(Butt, 0); // честная оговорка: индекс элемента контура (кромкуемая сторона) не проверен, взять из первого реального примера при открытии

    var RightSide = AddVertPanel(0, 0, H, D, W - T);
    RightSide.Name = 'Стойка правая';
    RightSide.AddButt(Butt, 0);

    // --- Дно и крышка, вкладные между стойками ---
    var Bottom = AddHorizPanel(T, 0, W - T, D, 0);
    Bottom.Name = 'Дно';
    Bottom.AddButt(Butt, 0);

    var Top = AddHorizPanel(T, 0, W - T, D, H - T);
    Top.Name = 'Крышка';
    Top.AddButt(Butt, 0);

    // --- Полки: эластичный блок - количество и фактический шаг пересчитываются от высоты ---
    var innerHeight = H - 2 * T; // высота внутреннего пространства между дном и крышкой
    var gaps = Math.round(innerHeight / targetSpacing);
    if (gaps < 1) gaps = 1;
    var actualSpacing = innerHeight / gaps;
    var shelvesCount = gaps - 1;

    for (var i = 1; i <= shelvesCount; i++) {
        var shelfY = T + i * actualSpacing;
        var Shelf = AddHorizPanel(T, 0, W - T, D, shelfY);
        Shelf.Name = 'Полка ' + i;
        Shelf.AddButt(Butt, 0);
    }

    // Фасад (дверь) и петли - намеренно не включены в этот черновик, следующий шаг
}

// Настоящая причина прежних неудачных запусков (01.08.2026): функции были только
// объявлены, но нигде не вызывались - по образцу рабочего примера пилота
// («Моя первая тумбочка 2.js») вызов должен идти в самом теле скрипта, а не только
// внутри Prop.OnChange.
MakeProperties();
Make();
Action.Continue(); // оставить в области скрипта для проверки перед передачей в Базис-Мебельщик
