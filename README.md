It was decided to use an atomic architecture, and the table itself was made universal with the possibility of duplication and expansion. The table is controlled from the *data.js* file. Table options such as deletion or editing or filtering can be reduced using a single object, which is quite compact.

## Atomic architecture

<img width="499" height="929" alt="image" src="https://github.com/user-attachments/assets/14025e9e-e3b1-485e-a968-267b90651b56" />


All styles and words are placed in separate constants for ease of editing.

from the bonus quest was not completed *Sort records by different fields* and also *Statistics dashboard*

## Table

<img width="2559" height="822" alt="image" src="https://github.com/user-attachments/assets/e710f450-3e14-49d7-b751-32820a4c366c" />

## Add mode

<img width="2558" height="722" alt="image" src="https://github.com/user-attachments/assets/8dbbf7b7-0aec-423f-978f-c65c4ae4d275" />

## Edit mode

<img width="2559" height="715" alt="image" src="https://github.com/user-attachments/assets/4f9b6251-4a31-41bf-a867-1326138605fe" />

## Filter Mode

<img width="2559" height="701" alt="image" src="https://github.com/user-attachments/assets/5edc28b4-cf37-4ddf-9232-6ca6314742f3" />

NOTES: in principle, the table's performance could be improved by caching queries. the limit on the backend was changed for the paginator test.
