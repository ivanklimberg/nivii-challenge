USE nivii_challenge;

CREATE TABLE question_history(
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    question VARCHAR(200) NOT NULL,
    succesful_response TINYINT NOT NULL DEFAULT 1,
    json_response JSON NULL,
    chart_type VARCHAR(12) NULL,
    created_at DATETIME NOT NULL DEFAULT NOW()
);