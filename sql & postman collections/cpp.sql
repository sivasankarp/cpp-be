-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 10, 2022 at 06:49 PM
-- Server version: 10.4.19-MariaDB
-- PHP Version: 7.4.20

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `cpp`
--

-- --------------------------------------------------------

--
-- Table structure for table `cpp_indications`
--

CREATE TABLE `cpp_indications` (
  `id` int(11) NOT NULL,
  `title` varchar(500) NOT NULL,
  `status` enum('A','D','E') NOT NULL DEFAULT 'A',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `cpp_indications`
--

INSERT INTO `cpp_indications` (`id`, `title`, `status`, `created_at`, `updated_at`) VALUES
(1, 'indication title', 'A', '0000-00-00 00:00:00', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `cpp_products`
--

CREATE TABLE `cpp_products` (
  `id` int(11) NOT NULL,
  `product_code` varchar(10) NOT NULL,
  `gs_code` varchar(50) NOT NULL,
  `product_name` varchar(200) NOT NULL,
  `trade_name` varchar(200) NOT NULL,
  `therapeutic_area` varchar(5000) NOT NULL,
  `indication` varchar(5000) NOT NULL,
  `status` enum('A','D','E') NOT NULL DEFAULT 'A',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `cpp_products`
--

INSERT INTO `cpp_products` (`id`, `product_code`, `gs_code`, `product_name`, `trade_name`, `therapeutic_area`, `indication`, `status`, `created_at`, `updated_at`) VALUES
(1, 'CPPRD001', 'GS001', 'Product Up 1', 'Test Trade', 'Test Therapeutic', 'Tset Indications', 'E', '0000-00-00 00:00:00', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `cpp_therapeutics`
--

CREATE TABLE `cpp_therapeutics` (
  `id` int(11) NOT NULL,
  `title` varchar(500) NOT NULL,
  `status` enum('A','D','E') NOT NULL DEFAULT 'A',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `cpp_therapeutics`
--

INSERT INTO `cpp_therapeutics` (`id`, `title`, `status`, `created_at`, `updated_at`) VALUES
(1, 'therapeutic title', 'A', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(2, 'therapeutic title', 'A', '0000-00-00 00:00:00', '0000-00-00 00:00:00');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cpp_indications`
--
ALTER TABLE `cpp_indications`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `cpp_products`
--
ALTER TABLE `cpp_products`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `cpp_therapeutics`
--
ALTER TABLE `cpp_therapeutics`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `cpp_indications`
--
ALTER TABLE `cpp_indications`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `cpp_products`
--
ALTER TABLE `cpp_products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `cpp_therapeutics`
--
ALTER TABLE `cpp_therapeutics`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
