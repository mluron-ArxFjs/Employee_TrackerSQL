INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (001, "Roger", "Reports", 1, 1),
       (002, "Hillary", "Melrose", 2, 1),
       (003, "Beth", "Bridges", 5, 1),
       (004, "Crystal", "Codebase", 3, 1),
       (005, "Kevin", "Laughlin", 4, 1),
       (006, "Mario", "Matthews", 6, 1),
       (007, "Donald", "Davis", 7, 1),
       (008, "Silvia", "Hoodie", 8, 1);

INSERT INTO role (id, title, salary, department_id)
VALUES  (001, "General Manager", 500000, 1),
        (002, "Accountant", 400000, 3),
        (003, "Research Director", 350000, 6),
        (004, "Business Director", 350000, 7),
        (005, "Web Designer", 300000, 2),
        (006, "Administration", 200000, 4),
        (007, "Junior Customer Service Agent", 100000, 5),
        (008, "Junior Marketing Agent", 100000, 8);

INSERT INTO department (id, name)
VALUES  (001, "Management"),
        (002, "Web Development"),
        (003, "Accounting & Finance"),
        (004, "Human Resources"),
        (005, "Customer Service"),
        (006, "Research & Development"),
        (007, "Business & Partnership"),
        (008, "Marketing");


       
