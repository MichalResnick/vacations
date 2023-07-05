-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 05, 2023 at 02:16 AM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `vacationsproject`
--
CREATE DATABASE IF NOT EXISTS `vacationsproject` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `vacationsproject`;

-- --------------------------------------------------------

--
-- Table structure for table `followers`
--

CREATE TABLE `followers` (
  `followerId` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `vacationId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `followers`
--

INSERT INTO `followers` (`followerId`, `userId`, `vacationId`) VALUES
(1, 2, 1),
(2, 1, 2),
(4, 1, 1),
(10, 12, 1),
(11, 19, 1),
(14, 19, 8),
(16, 19, 7),
(18, 22, 7),
(26, 22, 23),
(28, 22, 5);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `userId` int(11) NOT NULL,
  `firstName` varchar(40) NOT NULL,
  `lastName` varchar(40) NOT NULL,
  `email` varchar(256) NOT NULL,
  `password` varchar(300) NOT NULL,
  `role` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`userId`, `firstName`, `lastName`, `email`, `password`, `role`) VALUES
(1, 'Dor', 'Levy', 'dor@gmail.com', '12345', 'user'),
(2, 'Michal', 'Resnick', 'michalf3160@gmail.com', 'michal', 'user'),
(10, 'מיכל', 'פדר', 'michalf160@gmail.com', '587f5a3183d827777f6196cb149d0542166b7c7828219e46002e34e2b6184e8882447055d94056084e9582b5ed6931f54099c535e21ef00e0036d1fe6eb3d0c7', 'User'),
(11, 'Michal', 'Resnick', 'michalf@gmail.com', '4ac15d857dda6eed0c80c99d4e1573fb6fef05dc60010dc92a4d0f12ac761ca6dcb18431c8759735a4232d9440755e8e54958417bc66859e1b40e6cb13d1faa8', 'User'),
(12, 'Hananel', 'Resnick', 'hananel@gmail.com', '4ac15d857dda6eed0c80c99d4e1573fb6fef05dc60010dc92a4d0f12ac761ca6dcb18431c8759735a4232d9440755e8e54958417bc66859e1b40e6cb13d1faa8', 'User'),
(13, 'מיכל', 'פר', 'hananel058@gmail.com', 'b6827964927d3ddbece3992bf872f1aae13f7252ee7d2ef2ed2c2aadadfe5fe6f43a9d240b14c4264ee1f7d6c5ae4a1b90930f5199e0839bb5aaec88b300876c', 'User'),
(14, 'Hananel', 'Resnick', 'hannel@gmail.com', '4ac15d857dda6eed0c80c99d4e1573fb6fef05dc60010dc92a4d0f12ac761ca6dcb18431c8759735a4232d9440755e8e54958417bc66859e1b40e6cb13d1faa8', 'User'),
(15, 'מיכל', 'פדר', 'michal@gmail.com', '5378147b2e43c0efb7dae56f1916fc1d3d432a10d7576496de06529828d73426adfede867b1b62627f7c63250850115ed1cbe308fb590627adcf922440949268', 'User'),
(16, 'מיכל', 'פדר', 'micl@gmail.com', 'b36f4f21303836fdc1b17485258919511ea0d8639958e022055387af9572b378a6348052870752f425fad37b9bb6dd9fef3e315ead9cee2e783403efab65fb5f', 'User'),
(17, 'מיכל', 'פדר', 'mic@gmail.com', '3009dd53e40f8098fe30fe0496c01bbf809df596412c90107d89065d274ef2492fcf676771fa4d65cf5183e7107999f0a9881b2a08de22c9403a0df6add8df0e', 'User'),
(18, 'מיכל', 'פדר', 'm@gmail.com', '78e376cb10661b33babf083cebaa4fa586571be362136c1eb7b0068630b617108a61094f23e9e66a26d582394a93503a8975b7c75ac39faf4b22db2c256f4f6c', 'User'),
(19, 'Hananel', 'Resnick', 'hanan@gmail.com', '1050d3f2c8d9c0e990c340e33f8313e07040df87c638d1facfa1631d735b28bfb527bd924b74eb3751f74ca393a20b0a7c533064dedba09b4485f835112a722f', 'User'),
(20, 'admin', 'admin', 'admin@gmail.com', 'admin', 'Admin'),
(21, 'מיכל', 'פדר', '3160@gmail.com', '9dc83493460c6f4f13a39a78ffa2327ce14d487b21dfbdc1606816a90c9dbf3b73bae5beb7283717be928a014f6d579c178178b98bee1e99cd5602f571577b9e', 'User'),
(22, 'Michal', 'Resnick', '2058@gmail.com', '76a92dbe676c0590678ec15eed13b0cb67b0b8701d30fcf7a88a7c698793849ded4a6d8082ead5e459a89f5a9c25f6d6e4b43304fa7286b1a65d1c97564409dc', 'User'),
(23, 'admin', 'admin', 'admin2@gmail.com', 'bb83dffed3a34963ed26f285971c6f0d0ca51cbaef58769530aa7a6b934f98adca7ed3bb4117886cd241ad2e00cd3b8af9c062165fd64c7977389d7835824cc0', 'Admin');

-- --------------------------------------------------------

--
-- Table structure for table `vacations`
--

CREATE TABLE `vacations` (
  `vacationId` int(11) NOT NULL,
  `target` varchar(50) NOT NULL,
  `description` varchar(3000) NOT NULL,
  `startDate` date NOT NULL,
  `endDate` date NOT NULL,
  `price` int(30) NOT NULL,
  `imageName` varchar(120) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `vacations`
--

INSERT INTO `vacations` (`vacationId`, `target`, `description`, `startDate`, `endDate`, `price`, `imageName`) VALUES
(1, 'Prague', 'Prague, the capital of the Czech Republic is one of the most worthwhile destinations for a trip in Europe. Apart from classical beauty and houses with red roofs and pointed towers, Prague offers a lot of historical buildings and squares to admire, museums, concerts, nightlife that is suitable not only for young people and plenty of restaurants. And all this is served, of course, with a big glass of beer on the side - in the best Czech tradition.\r\n', '2023-10-15', '2023-10-18', 1000, 'prague.jpg'),
(2, 'Amsterdam', 'Amsterdam, the capital of the Netherlands, is one of the most popular destinations in Europe and the entire world. This wonderful city has a charm that you don\'t find everywhere - bridges over canals, cute houses, parks full of families, cyclists pedaling with pleasure, worthwhile museums and of course, coffee shops. And she manages to combine, in an almost harmonious way, a relaxed and fun vibe with a lively vibe and a young atmosphere.\r\n', '2023-10-10', '2023-10-17', 3200, 'amsterdam.jpeg'),
(3, 'Budapest', 'Budapest is the capital city of Hungary, one of the largest cities in Europe and undoubtedly one of the most beautiful. It\'s hard to think of Budapest and not immediately imagine its unique landscapes with its elegant buildings, stone streets and castles. Budapest was founded about 150 years ago, as a union of three different cities named Buda, Pest and Ubud, but the streets of the city tell the history of Hungary for centuries, which includes Roman settlement, 150 years of Ottoman occupation, a thriving Austro-Hungarian Empire and also two wars world.', '2023-07-18', '2023-07-21', 2200, 'budapest.jpg'),
(4, 'Milan ', 'Milan is the second largest city in Italy, the capital of the province of Lombardy, the economic center of the country and a permanent resident in the list of the ten most popular cities in Europe. And it\'s no coincidence at all, given the fact that Milan is a city whose Duomo is a world icon, its streets are full of charming historical buildings and international-class art is on every corner. Even the oldest shopping center in the world is in the city and it is still luxurious and full of life - just like Milan itself.\r\n', '2023-08-13', '2023-08-23', 3500, 'Milan.jpeg'),
(5, 'Dubai', 'Dubai\r\nBetween the desert sands and the Persian Gulf, one of the most intriguing and flashiest cities in the world has developed - Dubai. The largest city in the United Arab Emirates has become over the years synonymous with wealth and a luxury brand in its own right. It is home to the world\'s tallest tower, Burj Khalifa, the world\'s largest shopping mall and the iconic palm-shaped artificial islands, Palm Jumeirah.\r\n\r\nIt began its journey in the 18th century as a small fishing village, but its fate changed with the discovery of oil in 1966. Since then, it has gradually become a city that harmoniously combines Arab culture with Western constructions. The amazing skyline of the city, which you can see from one of the spectacular lookouts or even from your luxurious hotel room, will make you marvel every time.', '2023-09-03', '2023-09-07', 1500, 'Dubai.jpg'),
(6, 'Tbilisi', 'Tbilisi\r\nWelcome to Tbilisi, the city that is not talked about enough even though it has everything you need for the perfect vacation: a stunning ancient city? Check. Diverse history with a post-Soviet vibe? Check out a young scene of culture and art? Check. Good food, affordable prices and a great variety of shopping? Check check check!\r\n\r\nTbilisi, like the whole of Georgia is on the seam between Europe and Asia and this brought it not only strategic importance but also many cultural influences. During its history - which begins in 450 AD - the city passed through quite a few hands until it finally freed itself from the burden of communist rule in the 90s of the last century and became an independent state.', '2023-08-02', '2023-08-06', 1000, 'Tbilisi.jpg'),
(7, 'Berlin', 'Berlin\r\nFor many years Berlin has maintained an image of a rough and edgy city with an international art and techno scene. That\'s not exactly true anymore. I mean, Berlin is still one of the coolest cities in Europe and perhaps in the whole world, but in recent years it has become more refined, more accessible and is friendly to all types of visitors, including families and adults. Despite this, it remains one of the cheapest and most affordable European capitals. most.\r\n\r\nThe story of Berlin is somber and interesting and it peeks in almost every corner. You can meet in the remains of the Berlin Wall (such as in Mawer Park or the East Side Gallery), at crossing points from East Germany to West Germany (Check Point Charlie or even the Brandenburg Gate itself), many memorial stones embedded in the sidewalks, near the homes of Jews who were deported and murdered, and also the The monument with the controversial design in memory of the victims of the Holocaust, right in the center of the city.\r\nThe story of Berlin is somber and interesting and it peeks in almost every corner. You can meet in the remains of the Berlin Wall (such as in Mawer Park or the East Side Gallery), at crossing points from East Germany to West Germany (Check Point Charlie or even the Brandenburg Gate itself), many memorial stones embedded in the sidewalks, near the homes of Jews who were deported and murdered, and also the The monument with the controversial design in memory of the victims of the Holocaust, right in the center of the c', '2023-07-05', '2023-07-12', 2300, 'Berlin.jpg'),
(8, 'Paris', 'Paris\r\nParis - the capital of France and the largest city in the country, is home to art, European culture, romance taken from the movies, fashion, fine cuisine and basically why not.\r\n\r\nThe wonderful city of lights, so called among other things because it was one of the first cities to use street lighting, is one of the three most densely populated cities in the world, and one of the most touristic of them, with no less than 32 million tourists from around the globe visiting the city\'s streets every year.', '2023-06-13', '2023-06-21', 4100, 'Paris.jpg'),
(9, 'London', 'London - A Timeless Blend of History and Modernity  London, the capital city of England and the United Kingdom, is a captivating metropolis that seamlessly blends a rich historical heritage with the pulse of contemporary life. This vibrant city stands proudly on the banks of the iconic River Thames, offering a diverse and exciting experience for both locals and travelers alike.  Steeped in history that spans millennia, London boasts an array of iconic landmarks that tell the tale of its illustrious past. From the grandeur of Buckingham Palace, the official residence of the British monarch, to the timeless beauty of the Tower of London, where centuries-old stories echo through its walls. ', '2023-09-23', '2023-09-23', 1500, 'London.jpg'),
(22, 'vina', 'nice Japan', '2011-09-23', '2012-09-23', 1500, 'fb4835b0-4661-4c5a-a8db-0ac308aedd1a.jpeg'),
(23, 'japan', 'Japan is a fascinating country with a rich cultural heritage, stunning natural landscapes, and a unique blend of modernity and tradition. Known for its technological advancements, delicious cuisine, and welcoming hospitality, Japan offers a memorable experience to its visitors. Here\'s a brief description of some key aspects of Japan', '2023-06-30', '2023-07-10', 1400, '028ba579-fcbc-4be7-883f-d2602c1255e0.jpg'),
(28, 'Seychelles', 'Seychelles is an enchanting archipelago located in the Indian Ocean, renowned for its pristine white-sand beaches, crystal-clear turquoise waters, and breathtaking natural beauty. This paradise destination consists of 115 idyllic islands, each offering a unique and awe-inspiring experience.  As you set foot on the powdery beaches of Seychelles, you\'ll be greeted by a tranquil and serene atmosphere. The rhythmic lapping of the waves against the shore creates a soothing melody, inviting you to unwind and immerse yourself in the island\'s blissful ambiance.  The underwater world of Seychelles is a diver\'s paradise. With vibrant coral reefs ', '2023-10-22', '2023-10-30', 2255, '34f44731-866d-4bdc-b5c3-7e58099c4285.jpg');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `followers`
--
ALTER TABLE `followers`
  ADD PRIMARY KEY (`followerId`),
  ADD KEY `userId` (`userId`),
  ADD KEY `vacationId` (`vacationId`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`userId`);

--
-- Indexes for table `vacations`
--
ALTER TABLE `vacations`
  ADD PRIMARY KEY (`vacationId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `followers`
--
ALTER TABLE `followers`
  MODIFY `followerId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `userId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `vacations`
--
ALTER TABLE `vacations`
  MODIFY `vacationId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `followers`
--
ALTER TABLE `followers`
  ADD CONSTRAINT `followers_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `followers_ibfk_2` FOREIGN KEY (`vacationId`) REFERENCES `vacations` (`vacationId`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
