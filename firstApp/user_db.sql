-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 26, 2024 at 05:54 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `user_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `posts`
--

CREATE TABLE `posts` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `content` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `posts`
--

INSERT INTO `posts` (`id`, `user_id`, `content`, `created_at`) VALUES
(1, 1, 'Gg', '2024-11-23 18:41:47'),
(2, 1, 'ser', '2024-11-23 18:52:49'),
(3, 1, 'mmm', '2024-11-23 19:00:27'),
(4, 1, 'ggggggggg', '2024-11-23 19:18:09'),
(5, 3, 'Ok', '2024-11-23 19:50:06'),
(6, 3, 'GG EASY', '2024-11-23 19:51:38'),
(7, 5, 'iiiiii', '2024-11-23 19:58:56'),
(8, 5, 'Ggdddd', '2024-11-23 20:09:14'),
(9, 3, 'hello', '2024-11-25 18:37:33');

-- --------------------------------------------------------

--
-- Table structure for table `post_actions`
--

CREATE TABLE `post_actions` (
  `id` int(11) NOT NULL,
  `post_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `action_type` enum('like','share') NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `post_actions`
--

INSERT INTO `post_actions` (`id`, `post_id`, `user_id`, `action_type`, `created_at`) VALUES
(1, 3, 1, 'like', '2024-11-23 19:00:30'),
(2, 2, 1, 'like', '2024-11-23 19:00:33'),
(3, 3, 1, 'like', '2024-11-23 19:02:26'),
(4, 1, 1, 'like', '2024-11-23 19:02:42'),
(5, 3, 1, 'like', '2024-11-23 19:17:35'),
(6, 3, 1, 'like', '2024-11-23 19:17:37'),
(7, 5, 3, 'like', '2024-11-23 19:51:19'),
(8, 6, 3, 'like', '2024-11-23 19:52:23'),
(9, 6, 3, 'like', '2024-11-23 19:52:24'),
(10, 7, 5, 'like', '2024-11-23 20:06:21'),
(11, 4, 5, 'like', '2024-11-23 20:06:34'),
(12, 3, 5, 'like', '2024-11-23 20:06:36'),
(13, 8, 5, 'like', '2024-11-23 20:09:22'),
(14, 8, 3, 'like', '2024-11-25 18:36:41'),
(15, 8, 3, 'like', '2024-11-25 18:36:44'),
(16, 8, 3, 'like', '2024-11-25 18:36:50'),
(17, 7, 3, 'like', '2024-11-25 18:36:52'),
(18, 8, 3, 'like', '2024-11-25 18:37:06'),
(19, 8, 3, 'like', '2024-11-25 18:37:08'),
(20, 7, 3, 'like', '2024-11-25 18:37:17'),
(21, 8, 3, 'like', '2024-11-25 18:37:21'),
(22, 8, 3, 'like', '2024-11-25 18:37:22'),
(23, 8, 3, 'like', '2024-11-25 18:37:22'),
(24, 8, 3, 'like', '2024-11-25 18:37:22'),
(25, 8, 3, 'like', '2024-11-25 18:37:22'),
(26, 6, 3, 'like', '2024-11-25 18:37:23'),
(27, 9, 3, 'like', '2024-11-25 18:37:37'),
(28, 9, 3, 'like', '2024-11-25 18:53:56'),
(29, 8, 3, 'like', '2024-11-25 18:54:02');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`) VALUES
(1, 'abc', 'abc'),
(2, 'ser', 'ser'),
(3, 'mmm', 'mmm'),
(4, 'zaza', 'zaza'),
(5, 'op', 'op');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `posts`
--
ALTER TABLE `posts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `post_actions`
--
ALTER TABLE `post_actions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `post_id` (`post_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `posts`
--
ALTER TABLE `posts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `post_actions`
--
ALTER TABLE `post_actions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `posts`
--
ALTER TABLE `posts`
  ADD CONSTRAINT `posts_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `post_actions`
--
ALTER TABLE `post_actions`
  ADD CONSTRAINT `post_actions_ibfk_1` FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`),
  ADD CONSTRAINT `post_actions_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
