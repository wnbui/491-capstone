-- Generated Sample Data for Project Management System
-- Generated on: 2025-10-30 03:38:26.627963
-- Default password for all users: Password123!

USE project_mgmt;

-- Generating sample data...
-- Generated 10 users
-- Generated 35 projects
-- Generated 235 tasks

-- Disable foreign key checks for insertion
SET FOREIGN_KEY_CHECKS = 0;

-- Clear existing data
TRUNCATE TABLE tasks;

TRUNCATE TABLE projects;

TRUNCATE TABLE users;

TRUNCATE TABLE notes;

TRUNCATE TABLE events;

-- Insert users
INSERT INTO
    users (
        full_name,
        username,
        email,
        password_hash,
        role,
        created_at
    )
VALUES (
        'Kate Anderson',
        'kateanderson',
        'kateanderson@example.com',
        'scrypt:32768:8:1$Ayk6SwKJLN5aA20K$2a0ce0202e11d81e57e9193da32aa87eb2aed1d476e5848abfb2e6df27141d54556a7d0a7e3afcbaae69b17c7173e7d8335c074397269b1f179a27b8277ad323',
        'admin',
        '2025-02-11 03:38:26'
    ),
    (
        'Iris Quinn',
        'irisquinn',
        'irisquinn@example.com',
        'scrypt:32768:8:1$dTJM2NDriogR0UzY$1e7df9f2271c137ab7a32cb79dcb1f7aef92d78a2552257716e205aba33cce756f6f95f658aebda4250d2b2e01c6fa6c8adc112ffc3108d6bc3460140002ea09',
        'admin',
        '2025-01-31 03:38:26'
    ),
    (
        'Uma Patel',
        'umapatel',
        'umapatel@example.com',
        'scrypt:32768:8:1$nPUS7CUbWO3QXNEY$574879bb0e492df624bb2fba215985433f92d767feada8eb5aa5d2d5aa3da70cabee7e46e2920b0b7efd079fd55cd5b47b9c8f7a4a57ce933c39662264c5d479',
        'user',
        '2024-12-25 03:38:26'
    ),
    (
        'Jack Anderson',
        'jackanderson',
        'jackanderson@example.com',
        'scrypt:32768:8:1$UWjIrG8I432r10dO$11ceb055c11bea34e89e404beba0d5205986c687c4e750497149783b4bd0e5628b553c1350d3333b5ba55e4dc89395a549f5ba89ecbad2887355aa0eecd6c26c',
        'user',
        '2025-08-07 03:38:27'
    ),
    (
        'Diana Ivanov',
        'dianaivanov',
        'dianaivanov@example.com',
        'scrypt:32768:8:1$gSXJtnZQTamAY9wg$9046fa15b8f82c1527556860836c3060bbe08746e0d24bd078c9d80a50907b19453ff72e96b1987c3baa8f5c6c6dda6edcfa3ea2d34b1dd46a905fb0a55e31b5',
        'user',
        '2024-12-07 03:38:27'
    ),
    (
        'Frank Harris',
        'frankharris',
        'frankharris@example.com',
        'scrypt:32768:8:1$LSJJJIf7uU5oY4IX$d55022682558fa0e628a3f39085acf3eb7d5a0a6ca099dd717ac1aa350d821d40004bdab30883404c113d7a54740aa98d462bdac08105170136636e687e2e655',
        'user',
        '2025-03-10 03:38:27'
    ),
    (
        'Noah Young',
        'noahyoung',
        'noahyoung@example.com',
        'scrypt:32768:8:1$Thn17oiNDEKlYrC5$7611ca53fa90c8fdaf5dcf10b2741abc9baed0881d22684f71a03b30d7753295926dbf6a61c2d030b48cae9eb58b099c1e76860925cf2ccf161105a7fcf43bd2',
        'user',
        '2025-02-04 03:38:27'
    ),
    (
        'Alice Foster',
        'alicefoster',
        'alicefoster@example.com',
        'scrypt:32768:8:1$T3T99efN0JjsevHQ$91725f2352648c24ef7c83fa8980792503cdffab0145957ab3fa7c87e10c46236d4f1b4fe7315bea4d56bb0fec95fd843be005cbd7d43cc34a9ecaaabde757da',
        'user',
        '2025-05-20 03:38:27'
    ),
    (
        'Tina Evans',
        'tinaevans',
        'tinaevans@example.com',
        'scrypt:32768:8:1$CRQjfSpQlvUAqNck$6846f2470e4035e25580f1cea337c01d7174a8a427ae666b59ddaff00e411b164296ec2a6dfe8dc2458eb41eeb9cc8563ca89d8e5d1230a95f09d42e68c4e58d',
        'user',
        '2025-04-16 03:38:27'
    ),
    (
        'Diana Young',
        'dianayoung',
        'dianayoung@example.com',
        'scrypt:32768:8:1$uioYetUzmimVA7zK$e92dedf04b8d2bafd03adcd1b2edfe877fa548f29f5d6cca24efc4f02afe1bdbba67f37954ff9ea1bd43b88bb3f5253d5067db76f1c5f70794dae9c20de25072',
        'user',
        '2024-12-31 03:38:27'
    );

-- Insert projects
INSERT INTO
    projects (
        id,
        name,
        description,
        status,
        owner_id,
        created_at,
        updated_at
    )
VALUES (
        1,
        'DevOps Pipeline #1',
        'Improving user experience and interface design',
        'active',
        1,
        '2025-03-11 03:38:26',
        '2025-05-02 03:38:26'
    ),
    (
        2,
        'User Authentication #2',
        'Optimizing database queries and application performance',
        'on_hold',
        1,
        '2025-03-04 03:38:26',
        '2025-03-16 03:38:26'
    ),
    (
        3,
        'E-commerce Platform #3',
        'Improving user experience and interface design',
        'completed',
        1,
        '2025-02-27 03:38:26',
        '2025-04-07 03:38:26'
    ),
    (
        4,
        'Data Warehouse #4',
        'Creating comprehensive documentation and training materials',
        'active',
        1,
        '2025-02-25 03:38:26',
        '2025-04-07 03:38:26'
    ),
    (
        5,
        'Bug Fix Sprint #5',
        'Implementing security best practices and compliance',
        'completed',
        2,
        '2025-02-23 03:38:26',
        '2025-03-01 03:38:26'
    ),
    (
        6,
        'Database Migration #6',
        'Creating comprehensive documentation and training materials',
        'active',
        2,
        '2025-02-28 03:38:26',
        '2025-04-28 03:38:26'
    ),
    (
        7,
        'Backup Solution #7',
        'Building automated testing and deployment pipeline',
        'planned',
        2,
        '2025-03-02 03:38:26',
        '2025-04-25 03:38:26'
    ),
    (
        8,
        'E-commerce Platform #8',
        'Complete overhaul of the current system with modern technologies',
        'on_hold',
        2,
        '2025-02-01 03:38:26',
        '2025-03-27 03:38:26'
    ),
    (
        9,
        'E-commerce Platform #9',
        'Building automated testing and deployment pipeline',
        'active',
        2,
        '2025-02-01 03:38:26',
        '2025-03-02 03:38:26'
    ),
    (
        10,
        'Payment Gateway #10',
        'Enhancing performance and scalability for growing user base',
        'active',
        3,
        '2024-12-30 03:38:26',
        '2025-02-05 03:38:26'
    ),
    (
        11,
        'Database Migration #11',
        'Migrating to cloud infrastructure for better reliability',
        'completed',
        3,
        '2024-12-30 03:38:26',
        '2025-01-19 03:38:26'
    ),
    (
        12,
        'Documentation Update #12',
        'Enhancing performance and scalability for growing user base',
        'planned',
        3,
        '2025-01-11 03:38:26',
        '2025-01-25 03:38:26'
    ),
    (
        13,
        'Data Warehouse #13',
        'Improving user experience and interface design',
        'active',
        4,
        '2025-08-24 03:38:27',
        '2025-09-02 03:38:27'
    ),
    (
        14,
        'Payment Gateway #14',
        'Implementing new features and improvements based on user feedback',
        'active',
        4,
        '2025-09-03 03:38:27',
        '2025-09-26 03:38:27'
    ),
    (
        15,
        'Cloud Migration #15',
        'Enhancing performance and scalability for growing user base',
        'active',
        4,
        '2025-08-21 03:38:27',
        '2025-10-12 03:38:27'
    ),
    (
        16,
        'Reporting System #16',
        'Creating comprehensive documentation and training materials',
        'archived',
        4,
        '2025-08-31 03:38:27',
        '2025-10-30 03:38:27'
    ),
    (
        17,
        'Customer Portal #17',
        'Creating comprehensive documentation and training materials',
        'active',
        4,
        '2025-09-06 03:38:27',
        '2025-10-01 03:38:27'
    ),
    (
        18,
        'Website Redesign #18',
        'Implementing new features and improvements based on user feedback',
        'active',
        5,
        '2024-12-20 03:38:27',
        '2024-12-26 03:38:27'
    ),
    (
        19,
        'AI Chatbot #19',
        'Enhancing performance and scalability for growing user base',
        'active',
        5,
        '2024-12-16 03:38:27',
        '2025-01-17 03:38:27'
    ),
    (
        20,
        'AI Chatbot #20',
        'Migrating to cloud infrastructure for better reliability',
        'completed',
        6,
        '2025-03-15 03:38:27',
        '2025-04-15 03:38:27'
    ),
    (
        21,
        'Cloud Migration #21',
        'Integrating third-party services to expand functionality',
        'completed',
        6,
        '2025-03-15 03:38:27',
        '2025-04-14 03:38:27'
    ),
    (
        22,
        'Data Warehouse #22',
        'Creating comprehensive documentation and training materials',
        'active',
        6,
        '2025-04-09 03:38:27',
        '2025-04-30 03:38:27'
    ),
    (
        23,
        'API Integration #23',
        'Migrating to cloud infrastructure for better reliability',
        'active',
        7,
        '2025-02-08 03:38:27',
        '2025-02-20 03:38:27'
    ),
    (
        24,
        'Social Media Integration #24',
        'Enhancing performance and scalability for growing user base',
        'planned',
        7,
        '2025-02-19 03:38:27',
        '2025-03-21 03:38:27'
    ),
    (
        25,
        'Backup Solution #25',
        'Enhancing performance and scalability for growing user base',
        'active',
        7,
        '2025-02-08 03:38:27',
        '2025-02-15 03:38:27'
    ),
    (
        26,
        'Feature Releases Q1 #26',
        'Enhancing performance and scalability for growing user base',
        'planned',
        8,
        '2025-06-17 03:38:27',
        '2025-07-14 03:38:27'
    ),
    (
        27,
        'CRM Implementation #27',
        'Improving user experience and interface design',
        'completed',
        8,
        '2025-05-24 03:38:27',
        '2025-06-06 03:38:27'
    ),
    (
        28,
        'Email Newsletter System #28',
        'Optimizing database queries and application performance',
        'active',
        8,
        '2025-05-30 03:38:27',
        '2025-06-27 03:38:27'
    ),
    (
        29,
        'AI Chatbot #29',
        'Implementing security best practices and compliance',
        'archived',
        9,
        '2025-04-24 03:38:27',
        '2025-06-16 03:38:27'
    ),
    (
        30,
        'Email Newsletter System #30',
        'Enhancing performance and scalability for growing user base',
        'active',
        9,
        '2025-05-14 03:38:27',
        '2025-05-28 03:38:27'
    ),
    (
        31,
        'AI Chatbot #31',
        'Building automated testing and deployment pipeline',
        'active',
        9,
        '2025-05-01 03:38:27',
        '2025-05-14 03:38:27'
    ),
    (
        32,
        'Reporting System #32',
        'Optimizing database queries and application performance',
        'completed',
        10,
        '2025-01-24 03:38:27',
        '2025-02-15 03:38:27'
    ),
    (
        33,
        'Backup Solution #33',
        'Complete overhaul of the current system with modern technologies',
        'archived',
        10,
        '2025-01-22 03:38:27',
        '2025-02-27 03:38:27'
    ),
    (
        34,
        'Machine Learning Model #34',
        'Enhancing performance and scalability for growing user base',
        'completed',
        10,
        '2025-01-20 03:38:27',
        '2025-01-24 03:38:27'
    ),
    (
        35,
        'Backup Solution #35',
        'Implementing security best practices and compliance',
        'planned',
        10,
        '2025-01-11 03:38:27',
        '2025-03-09 03:38:27'
    );

-- Insert tasks
INSERT INTO
    tasks (
        id,
        title,
        description,
        status,
        points,
        owner_id,
        project_id,
        created_at,
        updated_at
    )
VALUES (
        1,
        'Write API endpoints (Project 1)',
        'Need to test thoroughly before deployment',
        'todo',
        21,
        1,
        1,
        '2025-04-09 03:38:26',
        '2025-04-28 03:38:26'
    ),
    (
        2,
        'Set up alerts (Project 1)',
        'Requires review from senior developer',
        'todo',
        5,
        1,
        1,
        '2025-03-30 03:38:26',
        '2025-04-15 03:38:26'
    ),
    (
        3,
        'Write API endpoints (Project 1)',
        'Must follow coding standards and best practices',
        'in_progress',
        1,
        1,
        1,
        '2025-04-10 03:38:26',
        '2025-04-28 03:38:26'
    ),
    (
        4,
        'Update dependencies (Project 1)',
        'Requires review from senior developer',
        'done',
        21,
        1,
        1,
        '2025-04-04 03:38:26',
        '2025-04-22 03:38:26'
    ),
    (
        5,
        'Fix UI issues (Project 1)',
        'This task requires careful planning and execution',
        'in_progress',
        21,
        1,
        1,
        '2025-04-05 03:38:26',
        '2025-04-11 03:38:26'
    ),
    (
        6,
        'Design mockups (Project 1)',
        'Ensure backward compatibility',
        'in_progress',
        2,
        1,
        1,
        '2025-03-26 03:38:26',
        '2025-03-28 03:38:26'
    ),
    (
        7,
        'Add validation (Project 1)',
        'Consider edge cases and error scenarios',
        'todo',
        5,
        1,
        1,
        '2025-03-22 03:38:26',
        '2025-04-09 03:38:26'
    ),
    (
        8,
        'Add error handling (Project 1)',
        'High priority - blocking other tasks',
        'in_review',
        5,
        1,
        1,
        '2025-03-20 03:38:26',
        '2025-04-03 03:38:26'
    ),
    (
        9,
        'Implement search feature (Project 1)',
        'Ensure backward compatibility',
        'in_progress',
        5,
        1,
        1,
        '2025-03-17 03:38:26',
        '2025-03-23 03:38:26'
    ),
    (
        10,
        'Update documentation (Project 2)',
        'Consider edge cases and error scenarios',
        'done',
        13,
        1,
        2,
        '2025-03-07 03:38:26',
        '2025-03-15 03:38:26'
    ),
    (
        11,
        'Code review (Project 2)',
        'Consider edge cases and error scenarios',
        'done',
        2,
        1,
        2,
        '2025-03-26 03:38:26',
        '2025-04-06 03:38:26'
    ),
    (
        12,
        'Implement search feature (Project 2)',
        'Document all changes and decisions',
        'in_review',
        3,
        1,
        2,
        '2025-03-17 03:38:26',
        '2025-04-01 03:38:26'
    ),
    (
        13,
        'Add analytics tracking (Project 3)',
        'Requires review from senior developer',
        'todo',
        8,
        1,
        3,
        '2025-03-23 03:38:26',
        '2025-03-23 03:38:26'
    ),
    (
        14,
        'Add logging (Project 3)',
        'Consider edge cases and error scenarios',
        'in_progress',
        5,
        1,
        3,
        '2025-03-16 03:38:26',
        '2025-03-28 03:38:26'
    ),
    (
        15,
        'Update dependencies (Project 3)',
        'Document all changes and decisions',
        'in_review',
        1,
        1,
        3,
        '2025-03-04 03:38:26',
        '2025-03-22 03:38:26'
    ),
    (
        16,
        'Add validation (Project 3)',
        'Can be done independently',
        'done',
        8,
        1,
        3,
        '2025-03-28 03:38:26',
        '2025-04-14 03:38:26'
    ),
    (
        17,
        'Update documentation (Project 3)',
        'Requires review from senior developer',
        'todo',
        13,
        1,
        3,
        '2025-03-27 03:38:26',
        '2025-03-30 03:38:26'
    ),
    (
        18,
        'Add error handling (Project 3)',
        'Document all changes and decisions',
        'todo',
        3,
        1,
        3,
        '2025-03-24 03:38:26',
        '2025-03-28 03:38:26'
    ),
    (
        19,
        'Add logging (Project 3)',
        'Must follow coding standards and best practices',
        'in_progress',
        2,
        1,
        3,
        '2025-03-13 03:38:26',
        '2025-03-20 03:38:26'
    ),
    (
        20,
        'Update dependencies (Project 3)',
        'Requires review from senior developer',
        'in_review',
        13,
        1,
        3,
        '2025-03-23 03:38:26',
        '2025-04-09 03:38:26'
    ),
    (
        21,
        'Update dependencies (Project 3)',
        'Requires review from senior developer',
        'todo',
        5,
        1,
        3,
        '2025-02-27 03:38:26',
        '2025-03-18 03:38:26'
    ),
    (
        22,
        'Update dependencies (Project 3)',
        'Requires review from senior developer',
        'in_review',
        1,
        1,
        3,
        '2025-03-29 03:38:26',
        '2025-04-03 03:38:26'
    ),
    (
        23,
        'Security review (Project 4)',
        'Need to coordinate with the team on this one',
        'in_progress',
        21,
        1,
        4,
        '2025-03-07 03:38:26',
        '2025-03-22 03:38:26'
    ),
    (
        24,
        'Write unit tests (Project 4)',
        'Document all changes and decisions',
        'done',
        13,
        1,
        4,
        '2025-03-07 03:38:26',
        '2025-03-13 03:38:26'
    ),
    (
        25,
        'Implement search feature (Project 4)',
        'This task requires careful planning and execution',
        'done',
        3,
        1,
        4,
        '2025-03-05 03:38:26',
        '2025-03-11 03:38:26'
    ),
    (
        26,
        'Fix UI issues (Project 4)',
        'Need to coordinate with the team on this one',
        'todo',
        8,
        1,
        4,
        '2025-02-27 03:38:26',
        '2025-03-19 03:38:26'
    ),
    (
        27,
        'Design mockups (Project 4)',
        'Need to coordinate with the team on this one',
        'done',
        8,
        1,
        4,
        '2025-03-22 03:38:26',
        '2025-03-22 03:38:26'
    ),
    (
        28,
        'Add analytics tracking (Project 5)',
        'Ensure backward compatibility',
        'in_review',
        1,
        2,
        5,
        '2025-03-03 03:38:26',
        '2025-03-15 03:38:26'
    ),
    (
        29,
        'Refactor legacy code (Project 5)',
        'Consider edge cases and error scenarios',
        'in_review',
        1,
        2,
        5,
        '2025-03-01 03:38:26',
        '2025-03-15 03:38:26'
    ),
    (
        30,
        'Implement notifications (Project 5)',
        'Ensure backward compatibility',
        'in_progress',
        1,
        2,
        5,
        '2025-03-25 03:38:26',
        '2025-03-25 03:38:26'
    ),
    (
        31,
        'Write unit tests (Project 5)',
        'Need to test thoroughly before deployment',
        'in_progress',
        1,
        2,
        5,
        '2025-03-22 03:38:26',
        '2025-03-27 03:38:26'
    ),
    (
        32,
        'Update documentation (Project 5)',
        'Consider edge cases and error scenarios',
        'in_review',
        13,
        2,
        5,
        '2025-03-20 03:38:26',
        '2025-03-24 03:38:26'
    ),
    (
        33,
        'Add validation (Project 5)',
        'Consider edge cases and error scenarios',
        'todo',
        1,
        2,
        5,
        '2025-03-18 03:38:26',
        '2025-04-03 03:38:26'
    ),
    (
        34,
        'Implement caching (Project 6)',
        'Requires review from senior developer',
        'in_review',
        21,
        2,
        6,
        '2025-03-05 03:38:26',
        '2025-03-13 03:38:26'
    ),
    (
        35,
        'Set up CI/CD pipeline (Project 6)',
        'High priority - blocking other tasks',
        'done',
        13,
        2,
        6,
        '2025-03-03 03:38:26',
        '2025-03-20 03:38:26'
    ),
    (
        36,
        'Fix critical bug (Project 6)',
        'Need to coordinate with the team on this one',
        'in_progress',
        3,
        2,
        6,
        '2025-03-01 03:38:26',
        '2025-03-21 03:38:26'
    ),
    (
        37,
        'Implement search feature (Project 6)',
        'Document all changes and decisions',
        'in_progress',
        8,
        2,
        6,
        '2025-03-22 03:38:26',
        '2025-03-25 03:38:26'
    ),
    (
        38,
        'Deploy to staging (Project 6)',
        'Must follow coding standards and best practices',
        'done',
        21,
        2,
        6,
        '2025-03-05 03:38:26',
        '2025-03-05 03:38:26'
    ),
    (
        39,
        'Security review (Project 6)',
        'Requires review from senior developer',
        'done',
        1,
        2,
        6,
        '2025-03-09 03:38:26',
        '2025-03-20 03:38:26'
    ),
    (
        40,
        'Refactor legacy code (Project 7)',
        'Consider edge cases and error scenarios',
        'done',
        3,
        2,
        7,
        '2025-03-19 03:38:26',
        '2025-03-28 03:38:26'
    ),
    (
        41,
        'Set up alerts (Project 7)',
        'Consider edge cases and error scenarios',
        'in_review',
        5,
        2,
        7,
        '2025-03-29 03:38:26',
        '2025-04-08 03:38:26'
    ),
    (
        42,
        'Set up alerts (Project 7)',
        'Must follow coding standards and best practices',
        'in_review',
        13,
        2,
        7,
        '2025-03-20 03:38:26',
        '2025-04-05 03:38:26'
    ),
    (
        43,
        'Write integration tests (Project 7)',
        'Document all changes and decisions',
        'done',
        1,
        2,
        7,
        '2025-03-05 03:38:26',
        '2025-03-17 03:38:26'
    ),
    (
        44,
        'Security review (Project 7)',
        'Can be done independently',
        'done',
        3,
        2,
        7,
        '2025-03-10 03:38:26',
        '2025-03-20 03:38:26'
    ),
    (
        45,
        'Design mockups (Project 8)',
        'High priority - blocking other tasks',
        'todo',
        21,
        2,
        8,
        '2025-02-27 03:38:26',
        '2025-03-07 03:38:26'
    ),
    (
        46,
        'Add validation (Project 8)',
        'Can be done independently',
        'done',
        1,
        2,
        8,
        '2025-02-20 03:38:26',
        '2025-03-09 03:38:26'
    ),
    (
        47,
        'Implement caching (Project 8)',
        'Consider edge cases and error scenarios',
        'todo',
        8,
        2,
        8,
        '2025-02-12 03:38:26',
        '2025-02-28 03:38:26'
    ),
    (
        48,
        'Add validation (Project 8)',
        'Document all changes and decisions',
        'in_progress',
        21,
        2,
        8,
        '2025-02-20 03:38:26',
        '2025-02-26 03:38:26'
    ),
    (
        49,
        'Configure monitoring (Project 8)',
        'Document all changes and decisions',
        'in_review',
        8,
        2,
        8,
        '2025-02-09 03:38:26',
        '2025-02-09 03:38:26'
    ),
    (
        50,
        'Fix critical bug (Project 8)',
        'This task requires careful planning and execution',
        'todo',
        8,
        2,
        8,
        '2025-02-25 03:38:26',
        '2025-03-13 03:38:26'
    ),
    (
        51,
        'Write unit tests (Project 8)',
        'Requires review from senior developer',
        'todo',
        1,
        2,
        8,
        '2025-02-04 03:38:26',
        '2025-02-13 03:38:26'
    ),
    (
        52,
        'Implement notifications (Project 8)',
        'Can be done independently',
        'in_review',
        2,
        2,
        8,
        '2025-02-28 03:38:26',
        '2025-03-17 03:38:26'
    ),
    (
        53,
        'Create user guide (Project 8)',
        'High priority - blocking other tasks',
        'in_progress',
        21,
        2,
        8,
        '2025-02-12 03:38:26',
        '2025-02-14 03:38:26'
    ),
    (
        54,
        'Set up CI/CD pipeline (Project 8)',
        'High priority - blocking other tasks',
        'done',
        5,
        2,
        8,
        '2025-03-03 03:38:26',
        '2025-03-20 03:38:26'
    ),
    (
        55,
        'Write integration tests (Project 9)',
        'Can be done independently',
        'in_progress',
        5,
        2,
        9,
        '2025-02-11 03:38:26',
        '2025-02-24 03:38:26'
    ),
    (
        56,
        'Create user guide (Project 9)',
        'Ensure backward compatibility',
        'in_progress',
        21,
        2,
        9,
        '2025-02-11 03:38:26',
        '2025-02-28 03:38:26'
    ),
    (
        57,
        'Configure monitoring (Project 9)',
        'High priority - blocking other tasks',
        'in_progress',
        5,
        2,
        9,
        '2025-03-02 03:38:26',
        '2025-03-14 03:38:26'
    ),
    (
        58,
        'Add error handling (Project 9)',
        'Consider edge cases and error scenarios',
        'in_progress',
        3,
        2,
        9,
        '2025-02-23 03:38:26',
        '2025-03-02 03:38:26'
    ),
    (
        59,
        'User acceptance testing (Project 9)',
        'This task requires careful planning and execution',
        'todo',
        2,
        2,
        9,
        '2025-02-21 03:38:26',
        '2025-03-13 03:38:26'
    ),
    (
        60,
        'Fix critical bug (Project 9)',
        'Must follow coding standards and best practices',
        'done',
        8,
        2,
        9,
        '2025-02-14 03:38:26',
        '2025-02-24 03:38:26'
    ),
    (
        61,
        'Write API endpoints (Project 9)',
        'High priority - blocking other tasks',
        'in_progress',
        2,
        2,
        9,
        '2025-02-13 03:38:26',
        '2025-02-17 03:38:26'
    ),
    (
        62,
        'Performance testing (Project 10)',
        'Need to coordinate with the team on this one',
        'todo',
        3,
        3,
        10,
        '2025-01-28 03:38:26',
        '2025-02-12 03:38:26'
    ),
    (
        63,
        'Configure monitoring (Project 10)',
        'Can be done independently',
        'in_review',
        2,
        3,
        10,
        '2025-01-08 03:38:26',
        '2025-01-22 03:38:26'
    ),
    (
        64,
        'Design mockups (Project 10)',
        'Can be done independently',
        'in_progress',
        2,
        3,
        10,
        '2025-01-26 03:38:26',
        '2025-02-10 03:38:26'
    ),
    (
        65,
        'Fix UI issues (Project 10)',
        'Consider edge cases and error scenarios',
        'todo',
        21,
        3,
        10,
        '2025-01-10 03:38:26',
        '2025-01-24 03:38:26'
    ),
    (
        66,
        'Set up alerts (Project 10)',
        'Can be done independently',
        'todo',
        2,
        3,
        10,
        '2025-01-01 03:38:26',
        '2025-01-10 03:38:26'
    ),
    (
        67,
        'Create landing page (Project 10)',
        'Need to coordinate with the team on this one',
        'todo',
        3,
        3,
        10,
        '2025-01-12 03:38:26',
        '2025-01-29 03:38:26'
    ),
    (
        68,
        'Create landing page (Project 11)',
        'Must follow coding standards and best practices',
        'in_review',
        5,
        3,
        11,
        '2025-01-20 03:38:26',
        '2025-01-21 03:38:26'
    ),
    (
        69,
        'Performance testing (Project 11)',
        'Consider edge cases and error scenarios',
        'done',
        21,
        3,
        11,
        '2025-01-11 03:38:26',
        '2025-01-18 03:38:26'
    ),
    (
        70,
        'Write API endpoints (Project 11)',
        'High priority - blocking other tasks',
        'todo',
        1,
        3,
        11,
        '2025-01-20 03:38:26',
        '2025-01-27 03:38:26'
    ),
    (
        71,
        'Deploy to staging (Project 11)',
        'Must follow coding standards and best practices',
        'done',
        3,
        3,
        11,
        '2025-01-08 03:38:26',
        '2025-01-21 03:38:26'
    ),
    (
        72,
        'Configure monitoring (Project 11)',
        'Can be done independently',
        'done',
        21,
        3,
        11,
        '2025-01-29 03:38:26',
        '2025-02-05 03:38:26'
    ),
    (
        73,
        'Implement authentication (Project 11)',
        'Consider edge cases and error scenarios',
        'todo',
        5,
        3,
        11,
        '2025-01-06 03:38:26',
        '2025-01-21 03:38:26'
    ),
    (
        74,
        'Write unit tests (Project 11)',
        'Need to coordinate with the team on this one',
        'done',
        8,
        3,
        11,
        '2025-01-16 03:38:26',
        '2025-02-04 03:38:26'
    ),
    (
        75,
        'User acceptance testing (Project 11)',
        'Document all changes and decisions',
        'in_progress',
        5,
        3,
        11,
        '2025-01-24 03:38:26',
        '2025-01-30 03:38:26'
    ),
    (
        76,
        'Security review (Project 11)',
        'Document all changes and decisions',
        'todo',
        21,
        3,
        11,
        '2025-01-04 03:38:26',
        '2025-01-13 03:38:26'
    ),
    (
        77,
        'Add validation (Project 11)',
        'Consider edge cases and error scenarios',
        'in_progress',
        21,
        3,
        11,
        '2025-01-19 03:38:26',
        '2025-01-23 03:38:26'
    ),
    (
        78,
        'Configure monitoring (Project 12)',
        'Must follow coding standards and best practices',
        'done',
        21,
        3,
        12,
        '2025-01-30 03:38:26',
        '2025-02-06 03:38:26'
    ),
    (
        79,
        'Create database schema (Project 12)',
        'Consider edge cases and error scenarios',
        'in_review',
        5,
        3,
        12,
        '2025-01-19 03:38:26',
        '2025-01-29 03:38:26'
    ),
    (
        80,
        'Update documentation (Project 12)',
        'Document all changes and decisions',
        'in_review',
        8,
        3,
        12,
        '2025-01-18 03:38:26',
        '2025-01-25 03:38:26'
    ),
    (
        81,
        'Refactor legacy code (Project 12)',
        'Document all changes and decisions',
        'todo',
        21,
        3,
        12,
        '2025-01-20 03:38:26',
        '2025-01-29 03:38:26'
    ),
    (
        82,
        'Security review (Project 12)',
        'Requires review from senior developer',
        'in_progress',
        1,
        3,
        12,
        '2025-01-11 03:38:26',
        '2025-01-11 03:38:26'
    ),
    (
        83,
        'Add analytics tracking (Project 12)',
        'Requires review from senior developer',
        'done',
        5,
        3,
        12,
        '2025-01-25 03:38:26',
        '2025-02-12 03:38:26'
    ),
    (
        84,
        'Update dependencies (Project 12)',
        'Requires review from senior developer',
        'done',
        2,
        3,
        12,
        '2025-01-16 03:38:26',
        '2025-02-02 03:38:26'
    ),
    (
        85,
        'Design mockups (Project 13)',
        'Consider edge cases and error scenarios',
        'in_progress',
        5,
        4,
        13,
        '2025-09-03 03:38:27',
        '2025-09-21 03:38:27'
    ),
    (
        86,
        'Implement notifications (Project 13)',
        'Document all changes and decisions',
        'in_progress',
        3,
        4,
        13,
        '2025-09-09 03:38:27',
        '2025-09-21 03:38:27'
    ),
    (
        87,
        'Set up alerts (Project 13)',
        'Document all changes and decisions',
        'in_progress',
        5,
        4,
        13,
        '2025-08-29 03:38:27',
        '2025-09-10 03:38:27'
    ),
    (
        88,
        'Performance testing (Project 13)',
        'Need to coordinate with the team on this one',
        'done',
        2,
        4,
        13,
        '2025-08-25 03:38:27',
        '2025-08-29 03:38:27'
    ),
    (
        89,
        'Create landing page (Project 13)',
        'This task requires careful planning and execution',
        'in_review',
        21,
        4,
        13,
        '2025-09-11 03:38:27',
        '2025-09-13 03:38:27'
    ),
    (
        90,
        'Set up alerts (Project 13)',
        'Consider edge cases and error scenarios',
        'in_review',
        2,
        4,
        13,
        '2025-09-12 03:38:27',
        '2025-09-18 03:38:27'
    ),
    (
        91,
        'Write API endpoints (Project 13)',
        'High priority - blocking other tasks',
        'in_review',
        21,
        4,
        13,
        '2025-09-01 03:38:27',
        '2025-09-12 03:38:27'
    ),
    (
        92,
        'Add analytics tracking (Project 13)',
        'Need to coordinate with the team on this one',
        'done',
        2,
        4,
        13,
        '2025-08-26 03:38:27',
        '2025-08-26 03:38:27'
    ),
    (
        93,
        'Add logging (Project 13)',
        'This task requires careful planning and execution',
        'todo',
        8,
        4,
        13,
        '2025-08-30 03:38:27',
        '2025-09-08 03:38:27'
    ),
    (
        94,
        'Create admin panel (Project 13)',
        'Document all changes and decisions',
        'done',
        13,
        4,
        13,
        '2025-09-03 03:38:27',
        '2025-09-16 03:38:27'
    ),
    (
        95,
        'Design mockups (Project 14)',
        'Need to coordinate with the team on this one',
        'done',
        1,
        4,
        14,
        '2025-09-12 03:38:27',
        '2025-09-22 03:38:27'
    ),
    (
        96,
        'Refactor legacy code (Project 14)',
        'Document all changes and decisions',
        'done',
        1,
        4,
        14,
        '2025-09-17 03:38:27',
        '2025-09-26 03:38:27'
    ),
    (
        97,
        'Create database schema (Project 14)',
        'Ensure backward compatibility',
        'done',
        21,
        4,
        14,
        '2025-09-21 03:38:27',
        '2025-10-06 03:38:27'
    ),
    (
        98,
        'Create admin panel (Project 14)',
        'High priority - blocking other tasks',
        'todo',
        5,
        4,
        14,
        '2025-09-18 03:38:27',
        '2025-10-04 03:38:27'
    ),
    (
        99,
        'Code review (Project 14)',
        'Ensure backward compatibility',
        'done',
        13,
        4,
        14,
        '2025-09-24 03:38:27',
        '2025-10-04 03:38:27'
    ),
    (
        100,
        'Create landing page (Project 15)',
        'Can be done independently',
        'in_review',
        13,
        4,
        15,
        '2025-09-13 03:38:27',
        '2025-09-20 03:38:27'
    ),
    (
        101,
        'Refactor legacy code (Project 15)',
        'Must follow coding standards and best practices',
        'in_progress',
        8,
        4,
        15,
        '2025-09-03 03:38:27',
        '2025-09-04 03:38:27'
    ),
    (
        102,
        'Security review (Project 15)',
        'This task requires careful planning and execution',
        'in_review',
        5,
        4,
        15,
        '2025-09-01 03:38:27',
        '2025-09-15 03:38:27'
    ),
    (
        103,
        'Update dependencies (Project 15)',
        'This task requires careful planning and execution',
        'todo',
        2,
        4,
        15,
        '2025-09-15 03:38:27',
        '2025-09-20 03:38:27'
    ),
    (
        104,
        'Create landing page (Project 15)',
        'This task requires careful planning and execution',
        'done',
        1,
        4,
        15,
        '2025-09-14 03:38:27',
        '2025-09-30 03:38:27'
    ),
    (
        105,
        'Update dependencies (Project 15)',
        'This task requires careful planning and execution',
        'todo',
        21,
        4,
        15,
        '2025-09-08 03:38:27',
        '2025-09-09 03:38:27'
    ),
    (
        106,
        'Create admin panel (Project 15)',
        'This task requires careful planning and execution',
        'todo',
        13,
        4,
        15,
        '2025-09-04 03:38:27',
        '2025-09-19 03:38:27'
    ),
    (
        107,
        'Implement notifications (Project 15)',
        'Can be done independently',
        'todo',
        1,
        4,
        15,
        '2025-09-04 03:38:27',
        '2025-09-19 03:38:27'
    ),
    (
        108,
        'Update documentation (Project 15)',
        'Document all changes and decisions',
        'in_review',
        21,
        4,
        15,
        '2025-09-14 03:38:27',
        '2025-09-30 03:38:27'
    ),
    (
        109,
        'Implement search feature (Project 16)',
        'Need to coordinate with the team on this one',
        'in_progress',
        21,
        4,
        16,
        '2025-09-22 03:38:27',
        '2025-10-09 03:38:27'
    ),
    (
        110,
        'Write integration tests (Project 16)',
        'Can be done independently',
        'todo',
        13,
        4,
        16,
        '2025-09-22 03:38:27',
        '2025-09-26 03:38:27'
    ),
    (
        111,
        'Add error handling (Project 16)',
        'Need to test thoroughly before deployment',
        'todo',
        1,
        4,
        16,
        '2025-09-03 03:38:27',
        '2025-09-18 03:38:27'
    ),
    (
        112,
        'User acceptance testing (Project 16)',
        'Must follow coding standards and best practices',
        'in_progress',
        5,
        4,
        16,
        '2025-09-25 03:38:27',
        '2025-10-15 03:38:27'
    ),
    (
        113,
        'Update dependencies (Project 16)',
        'Must follow coding standards and best practices',
        'in_progress',
        8,
        4,
        16,
        '2025-09-03 03:38:27',
        '2025-09-06 03:38:27'
    ),
    (
        114,
        'Update dependencies (Project 16)',
        'Requires review from senior developer',
        'todo',
        3,
        4,
        16,
        '2025-09-18 03:38:27',
        '2025-09-25 03:38:27'
    ),
    (
        115,
        'Create user guide (Project 16)',
        'Ensure backward compatibility',
        'in_review',
        1,
        4,
        16,
        '2025-09-02 03:38:27',
        '2025-09-06 03:38:27'
    ),
    (
        116,
        'Write unit tests (Project 17)',
        'Need to test thoroughly before deployment',
        'todo',
        3,
        4,
        17,
        '2025-09-11 03:38:27',
        '2025-09-11 03:38:27'
    ),
    (
        117,
        'Add logging (Project 17)',
        'Requires review from senior developer',
        'done',
        13,
        4,
        17,
        '2025-09-11 03:38:27',
        '2025-09-22 03:38:27'
    ),
    (
        118,
        'Refactor legacy code (Project 17)',
        'Consider edge cases and error scenarios',
        'in_progress',
        21,
        4,
        17,
        '2025-09-26 03:38:27',
        '2025-10-04 03:38:27'
    ),
    (
        119,
        'Refactor legacy code (Project 17)',
        'Document all changes and decisions',
        'todo',
        2,
        4,
        17,
        '2025-09-07 03:38:27',
        '2025-09-27 03:38:27'
    ),
    (
        120,
        'User acceptance testing (Project 17)',
        'Need to coordinate with the team on this one',
        'in_progress',
        21,
        4,
        17,
        '2025-10-05 03:38:27',
        '2025-10-19 03:38:27'
    ),
    (
        121,
        'Implement caching (Project 17)',
        'High priority - blocking other tasks',
        'in_progress',
        13,
        4,
        17,
        '2025-09-09 03:38:27',
        '2025-09-14 03:38:27'
    ),
    (
        122,
        'Add logging (Project 17)',
        'Need to coordinate with the team on this one',
        'todo',
        13,
        4,
        17,
        '2025-09-10 03:38:27',
        '2025-09-27 03:38:27'
    ),
    (
        123,
        'Update documentation (Project 18)',
        'Ensure backward compatibility',
        'done',
        13,
        5,
        18,
        '2024-12-20 03:38:27',
        '2024-12-27 03:38:27'
    ),
    (
        124,
        'Write unit tests (Project 18)',
        'This task requires careful planning and execution',
        'in_review',
        8,
        5,
        18,
        '2024-12-30 03:38:27',
        '2025-01-16 03:38:27'
    ),
    (
        125,
        'Set up CI/CD pipeline (Project 18)',
        'Document all changes and decisions',
        'todo',
        5,
        5,
        18,
        '2024-12-21 03:38:27',
        '2024-12-21 03:38:27'
    ),
    (
        126,
        'Create user guide (Project 18)',
        'Need to test thoroughly before deployment',
        'in_progress',
        8,
        5,
        18,
        '2025-01-10 03:38:27',
        '2025-01-11 03:38:27'
    ),
    (
        127,
        'Create landing page (Project 18)',
        'Need to coordinate with the team on this one',
        'in_review',
        5,
        5,
        18,
        '2025-01-18 03:38:27',
        '2025-01-29 03:38:27'
    ),
    (
        128,
        'Add error handling (Project 19)',
        'Consider edge cases and error scenarios',
        'done',
        3,
        5,
        19,
        '2025-01-08 03:38:27',
        '2025-01-24 03:38:27'
    ),
    (
        129,
        'Implement caching (Project 19)',
        'Can be done independently',
        'in_progress',
        1,
        5,
        19,
        '2024-12-30 03:38:27',
        '2025-01-01 03:38:27'
    ),
    (
        130,
        'Write integration tests (Project 19)',
        'Document all changes and decisions',
        'todo',
        1,
        5,
        19,
        '2024-12-29 03:38:27',
        '2024-12-29 03:38:27'
    ),
    (
        131,
        'Add logging (Project 19)',
        'Need to coordinate with the team on this one',
        'done',
        1,
        5,
        19,
        '2025-01-05 03:38:27',
        '2025-01-19 03:38:27'
    ),
    (
        132,
        'Update dependencies (Project 19)',
        'Ensure backward compatibility',
        'todo',
        8,
        5,
        19,
        '2024-12-16 03:38:27',
        '2025-01-03 03:38:27'
    ),
    (
        133,
        'Implement search feature (Project 19)',
        'Ensure backward compatibility',
        'todo',
        13,
        5,
        19,
        '2025-01-03 03:38:27',
        '2025-01-22 03:38:27'
    ),
    (
        134,
        'Set up alerts (Project 19)',
        'This task requires careful planning and execution',
        'in_review',
        8,
        5,
        19,
        '2025-01-08 03:38:27',
        '2025-01-23 03:38:27'
    ),
    (
        135,
        'Fix critical bug (Project 20)',
        'Need to test thoroughly before deployment',
        'done',
        8,
        6,
        20,
        '2025-04-07 03:38:27',
        '2025-04-13 03:38:27'
    ),
    (
        136,
        'Code review (Project 20)',
        'Consider edge cases and error scenarios',
        'todo',
        13,
        6,
        20,
        '2025-04-12 03:38:27',
        '2025-04-21 03:38:27'
    ),
    (
        137,
        'Code review (Project 20)',
        'Need to test thoroughly before deployment',
        'todo',
        3,
        6,
        20,
        '2025-04-11 03:38:27',
        '2025-04-19 03:38:27'
    ),
    (
        138,
        'Create landing page (Project 20)',
        'Consider edge cases and error scenarios',
        'in_progress',
        2,
        6,
        20,
        '2025-03-28 03:38:27',
        '2025-04-05 03:38:27'
    ),
    (
        139,
        'Implement notifications (Project 20)',
        'Ensure backward compatibility',
        'done',
        8,
        6,
        20,
        '2025-03-29 03:38:27',
        '2025-04-02 03:38:27'
    ),
    (
        140,
        'Update documentation (Project 20)',
        'Must follow coding standards and best practices',
        'done',
        1,
        6,
        20,
        '2025-03-16 03:38:27',
        '2025-04-04 03:38:27'
    ),
    (
        141,
        'Implement search feature (Project 21)',
        'Consider edge cases and error scenarios',
        'done',
        8,
        6,
        21,
        '2025-03-30 03:38:27',
        '2025-04-18 03:38:27'
    ),
    (
        142,
        'Create landing page (Project 21)',
        'Document all changes and decisions',
        'in_progress',
        8,
        6,
        21,
        '2025-04-02 03:38:27',
        '2025-04-04 03:38:27'
    ),
    (
        143,
        'Add logging (Project 21)',
        'Requires review from senior developer',
        'in_progress',
        21,
        6,
        21,
        '2025-03-19 03:38:27',
        '2025-03-23 03:38:27'
    ),
    (
        144,
        'Implement caching (Project 21)',
        'Need to test thoroughly before deployment',
        'in_progress',
        13,
        6,
        21,
        '2025-04-14 03:38:27',
        '2025-04-18 03:38:27'
    ),
    (
        145,
        'Create database schema (Project 21)',
        'Requires review from senior developer',
        'done',
        1,
        6,
        21,
        '2025-03-30 03:38:27',
        '2025-04-19 03:38:27'
    ),
    (
        146,
        'Write unit tests (Project 21)',
        'High priority - blocking other tasks',
        'todo',
        5,
        6,
        21,
        '2025-03-31 03:38:27',
        '2025-04-08 03:38:27'
    ),
    (
        147,
        'Update documentation (Project 22)',
        'Need to test thoroughly before deployment',
        'in_progress',
        1,
        6,
        22,
        '2025-05-03 03:38:27',
        '2025-05-08 03:38:27'
    ),
    (
        148,
        'Optimize queries (Project 22)',
        'Ensure backward compatibility',
        'in_progress',
        3,
        6,
        22,
        '2025-05-03 03:38:27',
        '2025-05-16 03:38:27'
    ),
    (
        149,
        'Write integration tests (Project 22)',
        'Need to test thoroughly before deployment',
        'in_progress',
        8,
        6,
        22,
        '2025-05-02 03:38:27',
        '2025-05-02 03:38:27'
    ),
    (
        150,
        'Add logging (Project 22)',
        'Ensure backward compatibility',
        'done',
        1,
        6,
        22,
        '2025-04-16 03:38:27',
        '2025-05-05 03:38:27'
    ),
    (
        151,
        'Update documentation (Project 22)',
        'High priority - blocking other tasks',
        'todo',
        13,
        6,
        22,
        '2025-05-09 03:38:27',
        '2025-05-14 03:38:27'
    ),
    (
        152,
        'Fix UI issues (Project 22)',
        'Need to test thoroughly before deployment',
        'done',
        5,
        6,
        22,
        '2025-05-08 03:38:27',
        '2025-05-11 03:38:27'
    ),
    (
        153,
        'Add error handling (Project 22)',
        'Document all changes and decisions',
        'todo',
        5,
        6,
        22,
        '2025-04-19 03:38:27',
        '2025-04-23 03:38:27'
    ),
    (
        154,
        'Create user guide (Project 22)',
        'Must follow coding standards and best practices',
        'in_progress',
        8,
        6,
        22,
        '2025-04-24 03:38:27',
        '2025-04-29 03:38:27'
    ),
    (
        155,
        'Write unit tests (Project 23)',
        'Can be done independently',
        'in_progress',
        5,
        7,
        23,
        '2025-03-07 03:38:27',
        '2025-03-21 03:38:27'
    ),
    (
        156,
        'Performance testing (Project 23)',
        'Need to test thoroughly before deployment',
        'todo',
        13,
        7,
        23,
        '2025-02-13 03:38:27',
        '2025-02-17 03:38:27'
    ),
    (
        157,
        'Create admin panel (Project 23)',
        'Document all changes and decisions',
        'in_review',
        3,
        7,
        23,
        '2025-02-17 03:38:27',
        '2025-02-28 03:38:27'
    ),
    (
        158,
        'Performance testing (Project 23)',
        'Must follow coding standards and best practices',
        'todo',
        21,
        7,
        23,
        '2025-02-26 03:38:27',
        '2025-03-16 03:38:27'
    ),
    (
        159,
        'Deploy to staging (Project 23)',
        'Ensure backward compatibility',
        'todo',
        2,
        7,
        23,
        '2025-02-22 03:38:27',
        '2025-03-14 03:38:27'
    ),
    (
        160,
        'Performance testing (Project 24)',
        'Requires review from senior developer',
        'done',
        1,
        7,
        24,
        '2025-03-02 03:38:27',
        '2025-03-22 03:38:27'
    ),
    (
        161,
        'Create landing page (Project 24)',
        'Ensure backward compatibility',
        'in_progress',
        8,
        7,
        24,
        '2025-03-20 03:38:27',
        '2025-03-21 03:38:27'
    ),
    (
        162,
        'Configure monitoring (Project 24)',
        'This task requires careful planning and execution',
        'in_progress',
        3,
        7,
        24,
        '2025-02-21 03:38:27',
        '2025-02-26 03:38:27'
    ),
    (
        163,
        'Update documentation (Project 24)',
        'Ensure backward compatibility',
        'todo',
        3,
        7,
        24,
        '2025-03-06 03:38:27',
        '2025-03-14 03:38:27'
    ),
    (
        164,
        'Update dependencies (Project 24)',
        'Need to coordinate with the team on this one',
        'in_progress',
        8,
        7,
        24,
        '2025-03-17 03:38:27',
        '2025-04-01 03:38:27'
    ),
    (
        165,
        'Configure monitoring (Project 24)',
        'Consider edge cases and error scenarios',
        'in_progress',
        21,
        7,
        24,
        '2025-03-08 03:38:27',
        '2025-03-21 03:38:27'
    ),
    (
        166,
        'Create database schema (Project 24)',
        'Consider edge cases and error scenarios',
        'done',
        5,
        7,
        24,
        '2025-03-13 03:38:27',
        '2025-03-17 03:38:27'
    ),
    (
        167,
        'Deploy to staging (Project 25)',
        'Ensure backward compatibility',
        'todo',
        21,
        7,
        25,
        '2025-02-22 03:38:27',
        '2025-03-09 03:38:27'
    ),
    (
        168,
        'Add logging (Project 25)',
        'Can be done independently',
        'todo',
        8,
        7,
        25,
        '2025-02-11 03:38:27',
        '2025-02-17 03:38:27'
    ),
    (
        169,
        'Create landing page (Project 25)',
        'Ensure backward compatibility',
        'done',
        21,
        7,
        25,
        '2025-03-10 03:38:27',
        '2025-03-12 03:38:27'
    ),
    (
        170,
        'Create landing page (Project 25)',
        'Must follow coding standards and best practices',
        'todo',
        5,
        7,
        25,
        '2025-03-10 03:38:27',
        '2025-03-30 03:38:27'
    ),
    (
        171,
        'Implement search feature (Project 25)',
        'Must follow coding standards and best practices',
        'todo',
        3,
        7,
        25,
        '2025-03-08 03:38:27',
        '2025-03-24 03:38:27'
    ),
    (
        172,
        'Write integration tests (Project 25)',
        'Need to test thoroughly before deployment',
        'in_review',
        3,
        7,
        25,
        '2025-02-11 03:38:27',
        '2025-02-20 03:38:27'
    ),
    (
        173,
        'Create user guide (Project 26)',
        'Need to test thoroughly before deployment',
        'in_review',
        8,
        8,
        26,
        '2025-07-04 03:38:27',
        '2025-07-14 03:38:27'
    ),
    (
        174,
        'Design mockups (Project 26)',
        'Need to test thoroughly before deployment',
        'in_progress',
        2,
        8,
        26,
        '2025-06-24 03:38:27',
        '2025-07-06 03:38:27'
    ),
    (
        175,
        'Implement search feature (Project 26)',
        'Need to coordinate with the team on this one',
        'todo',
        8,
        8,
        26,
        '2025-06-20 03:38:27',
        '2025-06-22 03:38:27'
    ),
    (
        176,
        'Set up alerts (Project 26)',
        'Document all changes and decisions',
        'done',
        21,
        8,
        26,
        '2025-07-11 03:38:27',
        '2025-07-30 03:38:27'
    ),
    (
        177,
        'Create database schema (Project 26)',
        'Ensure backward compatibility',
        'done',
        3,
        8,
        26,
        '2025-07-11 03:38:27',
        '2025-07-11 03:38:27'
    ),
    (
        178,
        'Implement notifications (Project 27)',
        'Ensure backward compatibility',
        'done',
        8,
        8,
        27,
        '2025-06-10 03:38:27',
        '2025-06-30 03:38:27'
    ),
    (
        179,
        'Create landing page (Project 27)',
        'Requires review from senior developer',
        'done',
        8,
        8,
        27,
        '2025-05-27 03:38:27',
        '2025-06-03 03:38:27'
    ),
    (
        180,
        'Configure monitoring (Project 27)',
        'Ensure backward compatibility',
        'in_progress',
        5,
        8,
        27,
        '2025-06-22 03:38:27',
        '2025-06-30 03:38:27'
    ),
    (
        181,
        'Create landing page (Project 27)',
        'High priority - blocking other tasks',
        'done',
        21,
        8,
        27,
        '2025-06-20 03:38:27',
        '2025-07-03 03:38:27'
    ),
    (
        182,
        'Write unit tests (Project 27)',
        'Must follow coding standards and best practices',
        'done',
        2,
        8,
        27,
        '2025-06-08 03:38:27',
        '2025-06-19 03:38:27'
    ),
    (
        183,
        'Implement search feature (Project 28)',
        'Consider edge cases and error scenarios',
        'done',
        3,
        8,
        28,
        '2025-06-26 03:38:27',
        '2025-07-03 03:38:27'
    ),
    (
        184,
        'Fix UI issues (Project 28)',
        'Must follow coding standards and best practices',
        'done',
        21,
        8,
        28,
        '2025-06-27 03:38:27',
        '2025-07-11 03:38:27'
    ),
    (
        185,
        'Design mockups (Project 28)',
        'This task requires careful planning and execution',
        'done',
        8,
        8,
        28,
        '2025-06-09 03:38:27',
        '2025-06-20 03:38:27'
    ),
    (
        186,
        'Code review (Project 28)',
        'Requires review from senior developer',
        'in_review',
        1,
        8,
        28,
        '2025-06-09 03:38:27',
        '2025-06-22 03:38:27'
    ),
    (
        187,
        'Implement caching (Project 28)',
        'This task requires careful planning and execution',
        'done',
        1,
        8,
        28,
        '2025-06-26 03:38:27',
        '2025-07-01 03:38:27'
    ),
    (
        188,
        'Security review (Project 28)',
        'Consider edge cases and error scenarios',
        'in_progress',
        8,
        8,
        28,
        '2025-06-14 03:38:27',
        '2025-07-01 03:38:27'
    ),
    (
        189,
        'Fix UI issues (Project 28)',
        'Requires review from senior developer',
        'done',
        13,
        8,
        28,
        '2025-06-13 03:38:27',
        '2025-06-24 03:38:27'
    ),
    (
        190,
        'Design mockups (Project 28)',
        'Consider edge cases and error scenarios',
        'in_progress',
        13,
        8,
        28,
        '2025-06-11 03:38:27',
        '2025-06-23 03:38:27'
    ),
    (
        191,
        'Update documentation (Project 29)',
        'Requires review from senior developer',
        'in_progress',
        3,
        9,
        29,
        '2025-05-14 03:38:27',
        '2025-05-19 03:38:27'
    ),
    (
        192,
        'Write API endpoints (Project 29)',
        'Ensure backward compatibility',
        'done',
        21,
        9,
        29,
        '2025-05-09 03:38:27',
        '2025-05-13 03:38:27'
    ),
    (
        193,
        'Code review (Project 29)',
        'Need to test thoroughly before deployment',
        'in_progress',
        3,
        9,
        29,
        '2025-05-02 03:38:27',
        '2025-05-21 03:38:27'
    ),
    (
        194,
        'Implement caching (Project 29)',
        'This task requires careful planning and execution',
        'done',
        1,
        9,
        29,
        '2025-05-16 03:38:27',
        '2025-05-16 03:38:27'
    ),
    (
        195,
        'Update dependencies (Project 29)',
        'This task requires careful planning and execution',
        'in_progress',
        13,
        9,
        29,
        '2025-05-06 03:38:27',
        '2025-05-09 03:38:27'
    ),
    (
        196,
        'Refactor legacy code (Project 29)',
        'This task requires careful planning and execution',
        'in_review',
        5,
        9,
        29,
        '2025-05-14 03:38:27',
        '2025-05-18 03:38:27'
    ),
    (
        197,
        'Design mockups (Project 29)',
        'Ensure backward compatibility',
        'in_progress',
        8,
        9,
        29,
        '2025-05-18 03:38:27',
        '2025-05-20 03:38:27'
    ),
    (
        198,
        'Create landing page (Project 30)',
        'This task requires careful planning and execution',
        'todo',
        5,
        9,
        30,
        '2025-06-13 03:38:27',
        '2025-06-15 03:38:27'
    ),
    (
        199,
        'Add logging (Project 30)',
        'Must follow coding standards and best practices',
        'done',
        8,
        9,
        30,
        '2025-05-16 03:38:27',
        '2025-05-20 03:38:27'
    ),
    (
        200,
        'Update documentation (Project 30)',
        'Must follow coding standards and best practices',
        'in_review',
        2,
        9,
        30,
        '2025-05-30 03:38:27',
        '2025-06-10 03:38:27'
    ),
    (
        201,
        'Code review (Project 31)',
        'Document all changes and decisions',
        'todo',
        3,
        9,
        31,
        '2025-05-24 03:38:27',
        '2025-05-29 03:38:27'
    ),
    (
        202,
        'Update dependencies (Project 31)',
        'Requires review from senior developer',
        'todo',
        1,
        9,
        31,
        '2025-05-25 03:38:27',
        '2025-06-06 03:38:27'
    ),
    (
        203,
        'Configure monitoring (Project 31)',
        'Ensure backward compatibility',
        'todo',
        5,
        9,
        31,
        '2025-05-25 03:38:27',
        '2025-06-04 03:38:27'
    ),
    (
        204,
        'Deploy to staging (Project 32)',
        'Ensure backward compatibility',
        'in_review',
        1,
        10,
        32,
        '2025-02-23 03:38:27',
        '2025-03-09 03:38:27'
    ),
    (
        205,
        'Write unit tests (Project 32)',
        'This task requires careful planning and execution',
        'in_progress',
        21,
        10,
        32,
        '2025-01-30 03:38:27',
        '2025-02-10 03:38:27'
    ),
    (
        206,
        'Implement search feature (Project 32)',
        'High priority - blocking other tasks',
        'in_review',
        1,
        10,
        32,
        '2025-02-12 03:38:27',
        '2025-02-24 03:38:27'
    ),
    (
        207,
        'Configure monitoring (Project 32)',
        'Must follow coding standards and best practices',
        'done',
        21,
        10,
        32,
        '2025-02-07 03:38:27',
        '2025-02-09 03:38:27'
    ),
    (
        208,
        'Update dependencies (Project 32)',
        'Requires review from senior developer',
        'in_progress',
        21,
        10,
        32,
        '2025-02-05 03:38:27',
        '2025-02-24 03:38:27'
    ),
    (
        209,
        'Implement search feature (Project 32)',
        'Consider edge cases and error scenarios',
        'todo',
        13,
        10,
        32,
        '2025-02-08 03:38:27',
        '2025-02-13 03:38:27'
    ),
    (
        210,
        'Implement search feature (Project 32)',
        'Requires review from senior developer',
        'in_progress',
        8,
        10,
        32,
        '2025-01-30 03:38:27',
        '2025-02-11 03:38:27'
    ),
    (
        211,
        'Create admin panel (Project 32)',
        'Need to coordinate with the team on this one',
        'todo',
        5,
        10,
        32,
        '2025-02-13 03:38:27',
        '2025-02-23 03:38:27'
    ),
    (
        212,
        'Deploy to staging (Project 32)',
        'Need to coordinate with the team on this one',
        'in_progress',
        5,
        10,
        32,
        '2025-02-07 03:38:27',
        '2025-02-14 03:38:27'
    ),
    (
        213,
        'User acceptance testing (Project 32)',
        'Need to coordinate with the team on this one',
        'in_progress',
        3,
        10,
        32,
        '2025-02-06 03:38:27',
        '2025-02-25 03:38:27'
    ),
    (
        214,
        'User acceptance testing (Project 33)',
        'Need to test thoroughly before deployment',
        'done',
        2,
        10,
        33,
        '2025-01-29 03:38:27',
        '2025-01-30 03:38:27'
    ),
    (
        215,
        'Write API endpoints (Project 33)',
        'Consider edge cases and error scenarios',
        'in_review',
        5,
        10,
        33,
        '2025-02-02 03:38:27',
        '2025-02-14 03:38:27'
    ),
    (
        216,
        'Design mockups (Project 33)',
        'High priority - blocking other tasks',
        'todo',
        2,
        10,
        33,
        '2025-02-06 03:38:27',
        '2025-02-13 03:38:27'
    ),
    (
        217,
        'Implement authentication (Project 33)',
        'Need to coordinate with the team on this one',
        'todo',
        5,
        10,
        33,
        '2025-02-18 03:38:27',
        '2025-02-22 03:38:27'
    ),
    (
        218,
        'Fix UI issues (Project 33)',
        'Need to test thoroughly before deployment',
        'todo',
        8,
        10,
        33,
        '2025-01-30 03:38:27',
        '2025-01-31 03:38:27'
    ),
    (
        219,
        'Write integration tests (Project 33)',
        'Ensure backward compatibility',
        'in_progress',
        2,
        10,
        33,
        '2025-01-28 03:38:27',
        '2025-02-11 03:38:27'
    ),
    (
        220,
        'Set up alerts (Project 33)',
        'Requires review from senior developer',
        'todo',
        2,
        10,
        33,
        '2025-02-08 03:38:27',
        '2025-02-10 03:38:27'
    ),
    (
        221,
        'Implement authentication (Project 33)',
        'Need to test thoroughly before deployment',
        'done',
        5,
        10,
        33,
        '2025-01-29 03:38:27',
        '2025-02-17 03:38:27'
    ),
    (
        222,
        'Refactor legacy code (Project 33)',
        'Document all changes and decisions',
        'todo',
        21,
        10,
        33,
        '2025-01-30 03:38:27',
        '2025-02-09 03:38:27'
    ),
    (
        223,
        'Performance testing (Project 33)',
        'Requires review from senior developer',
        'done',
        21,
        10,
        33,
        '2025-01-23 03:38:27',
        '2025-01-27 03:38:27'
    ),
    (
        224,
        'Create admin panel (Project 34)',
        'Consider edge cases and error scenarios',
        'todo',
        8,
        10,
        34,
        '2025-02-19 03:38:27',
        '2025-02-22 03:38:27'
    ),
    (
        225,
        'Fix UI issues (Project 34)',
        'Ensure backward compatibility',
        'done',
        1,
        10,
        34,
        '2025-02-09 03:38:27',
        '2025-02-19 03:38:27'
    ),
    (
        226,
        'Update documentation (Project 34)',
        'High priority - blocking other tasks',
        'in_progress',
        21,
        10,
        34,
        '2025-02-09 03:38:27',
        '2025-02-17 03:38:27'
    ),
    (
        227,
        'Add error handling (Project 34)',
        'Need to test thoroughly before deployment',
        'done',
        3,
        10,
        34,
        '2025-01-29 03:38:27',
        '2025-01-29 03:38:27'
    ),
    (
        228,
        'Add analytics tracking (Project 34)',
        'Need to test thoroughly before deployment',
        'in_review',
        8,
        10,
        34,
        '2025-01-31 03:38:27',
        '2025-02-17 03:38:27'
    ),
    (
        229,
        'Create user guide (Project 34)',
        'Consider edge cases and error scenarios',
        'done',
        13,
        10,
        34,
        '2025-01-22 03:38:27',
        '2025-02-04 03:38:27'
    ),
    (
        230,
        'Add error handling (Project 34)',
        'Can be done independently',
        'done',
        5,
        10,
        34,
        '2025-02-02 03:38:27',
        '2025-02-14 03:38:27'
    ),
    (
        231,
        'Implement caching (Project 35)',
        'Requires review from senior developer',
        'todo',
        5,
        10,
        35,
        '2025-02-10 03:38:27',
        '2025-02-23 03:38:27'
    ),
    (
        232,
        'Deploy to staging (Project 35)',
        'Can be done independently',
        'in_progress',
        3,
        10,
        35,
        '2025-01-20 03:38:27',
        '2025-02-03 03:38:27'
    ),
    (
        233,
        'Refactor legacy code (Project 35)',
        'Need to test thoroughly before deployment',
        'done',
        1,
        10,
        35,
        '2025-01-24 03:38:27',
        '2025-01-28 03:38:27'
    ),
    (
        234,
        'Design mockups (Project 35)',
        'Requires review from senior developer',
        'done',
        3,
        10,
        35,
        '2025-01-15 03:38:27',
        '2025-02-01 03:38:27'
    ),
    (
        235,
        'Performance testing (Project 35)',
        'Need to coordinate with the team on this one',
        'todo',
        1,
        10,
        35,
        '2025-01-12 03:38:27',
        '2025-01-31 03:38:27'
    );

INSERT INTO
    notes (
        id,
        title,
        content,
        owner_id,
        project_id,
        created_at,
        updated_at
    )
VALUES (
        1,
        'Login Bug Notes',
        'Observed login failures for multiple users. Need to check session handling.',
        1,
        1,
        '2025-01-05 09:00:00',
        '2025-01-05 09:15:00'
    ),
    (
        2,
        'UI Update Ideas',
        'Consider dark mode toggle and responsive cards for mobile view.',
        2,
        1,
        '2025-01-07 10:30:00',
        '2025-01-07 11:00:00'
    ),
    (
        3,
        'API Response Errors',
        'Investigated API failures on GET /tasks endpoint. Timeout is likely.',
        3,
        2,
        '2025-02-10 14:00:00',
        '2025-02-10 14:20:00'
    ),
    (
        4,
        'Sprint 2 Planning',
        'Assigned tasks for Sprint 2. Include testing and documentation.',
        4,
        3,
        '2025-02-12 09:00:00',
        '2025-02-12 09:45:00'
    ),
    (
        5,
        'Auth Module Feedback',
        'Reviewed code, suggested hashing improvements and error handling.',
        1,
        2,
        '2025-02-15 15:30:00',
        '2025-02-15 16:00:00'
    ),
    (
        6,
        'Staging Deployment Steps',
        'Steps to deploy latest build to staging: backup DB, migrate schema, restart service.',
        2,
        4,
        '2025-03-01 10:15:00',
        '2025-03-01 10:45:00'
    ),
    (
        7,
        'Beta User Feedback',
        'Users reported UI glitches in Safari and Chrome.',
        3,
        3,
        '2025-03-05 16:00:00',
        '2025-03-05 16:30:00'
    ),
    (
        8,
        'Database Migration Notes',
        'Need to alter `tasks` table and update foreign key constraints.',
        4,
        6,
        '2025-03-08 13:45:00',
        '2025-03-08 14:15:00'
    ),
    (
        9,
        'Feature Testing Checklist',
        'Test cases for new notifications feature: create, edit, delete events.',
        5,
        5,
        '2025-03-10 09:30:00',
        '2025-03-10 10:00:00'
    ),
    (
        10,
        'Retrospective Summary',
        'Completed Sprint 1. Noted improvements: faster reviews, better test coverage.',
        6,
        1,
        '2025-03-12 17:00:00',
        '2025-03-12 17:30:00'
    );

-- Insert sample events
INSERT INTO
    events (
        id,
        name,
        description,
        start,
        end,
        owner_id,
        creation_time
    )
VALUES (
        1,
        'Project 1 Kickoff',
        'Initial meeting to discuss goals, deliverables, and timeline.',
        '2025-01-05 09:00:00',
        '2025-01-05 10:00:00',
        1,
        NOW()
    ),
    (
        2,
        'UI Review',
        'Review updated UI components and gather feedback.',
        '2025-01-07 11:00:00',
        '2025-01-07 12:00:00',
        2,
        NOW()
    ),
    (
        3,
        'API Debug Session',
        'Debug GET /tasks endpoint failures and log results.',
        '2025-02-10 14:30:00',
        '2025-02-10 15:30:00',
        3,
        NOW()
    ),
    (
        4,
        'Sprint 2 Planning',
        'Assign tasks for Sprint 2 and estimate completion times.',
        '2025-02-12 09:00:00',
        '2025-02-12 10:30:00',
        4,
        NOW()
    ),
    (
        5,
        'Auth Module Review',
        'Review authentication implementation and security checks.',
        '2025-02-15 15:30:00',
        '2025-02-15 16:30:00',
        1,
        NOW()
    ),
    (
        6,
        'Staging Deployment',
        'Deploy latest version to staging environment for QA testing.',
        '2025-03-01 10:15:00',
        '2025-03-01 11:15:00',
        2,
        NOW()
    ),
    (
        7,
        'Beta Feedback Session',
        'Meet with beta users to collect UI/UX feedback.',
        '2025-03-05 16:00:00',
        '2025-03-05 17:00:00',
        3,
        NOW()
    ),
    (
        8,
        'Database Migration',
        'Execute schema changes and validate data integrity.',
        '2025-03-08 14:00:00',
        '2025-03-08 15:00:00',
        4,
        NOW()
    ),
    (
        9,
        'Feature QA Testing',
        'Run test cases for notifications and event creation.',
        '2025-03-10 10:00:00',
        '2025-03-10 11:00:00',
        5,
        NOW()
    ),
    (
        10,
        'Sprint 1 Retrospective',
        'Discuss what went well and what can be improved for next sprint.',
        '2025-03-12 17:00:00',
        '2025-03-12 18:00:00',
        6,
        NOW()
    );

-- Re-enable foreign key checks
SET FOREIGN_KEY_CHECKS = 1;

-- Sample data insertion complete!
-- Total records: 280