INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Roger", "Reports", 1, 1),
       ("Hillary", "Melrose", 2, 1),
       ("Beth", "Bridges", 5, 1),
       ("Crystal", "Codebase", 3, 1),
       ("Kevin", "Laughlin", 4, 1),
       ("Mario", "Matthews", 6, 1),
       ("Donald", "Davis", 7, 1),
       ("Silvia", "Hoodie", 8, 1);

INSERT INTO department (name)
VALUES  ("Management"),
        ("Web Development"),
        ("Accounting & Finance"),
        ("Human Resources"),
        ("Customer Service"),
        ("Research & Development"),
        ("Business & Partners"),
        ("Marketing");

INSERT INTO role (title, salary, department_id)
VALUES  ('General Manager', 5000000, 1),
        ('Accountant', 4000000, 3),
        ('Research Director', 3000000, 6),
        ('Business Director', 3000000, 7),
        ('Web Designer', 300000, 2),
        ('Administration', 200000, 4),
        ('Junior Customer Service Agent', 100000, 5),
        ('Junior Marketing Agent', 100000, 8);
       
