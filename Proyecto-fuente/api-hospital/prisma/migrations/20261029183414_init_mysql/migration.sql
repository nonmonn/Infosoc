-- CreateTable
CREATE TABLE `Pictograma` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `titulo` VARCHAR(191) NOT NULL,
    `imagenUrl` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Ruta` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,
    `origen` VARCHAR(191) NOT NULL,
    `destino` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PasoRuta` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `orden` INTEGER NOT NULL,
    `rutaId` INTEGER NOT NULL,
    `idPictograma` INTEGER NOT NULL,

    UNIQUE INDEX `PasoRuta_rutaId_orden_key`(`rutaId`, `orden`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `PasoRuta` ADD CONSTRAINT `PasoRuta_rutaId_fkey` FOREIGN KEY (`rutaId`) REFERENCES `Ruta`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PasoRuta` ADD CONSTRAINT `PasoRuta_idPictograma_fkey` FOREIGN KEY (`idPictograma`) REFERENCES `Pictograma`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
