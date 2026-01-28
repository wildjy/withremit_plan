
css_to_append = """
/* Confirm Modal Buttons */
.modal-btn-group {
    display: flex;
    gap: 12px;
    margin-top: 24px;
    width: 100%;
}

.modal-btn-group button {
    flex: 1;
    height: 48px;
    border-radius: 8px;
    font-size: 16px;
    font-weight: 600;
    display: flex;
    align-items: center;
    justify-content: center;
}

.btn-cancel {
    background-color: #F3F4F6;
    color: #4B5563;
}

.btn-confirm-action {
    background-color: #1B5E9E;
    color: #FFFFFF;
}

.btn-confirm-action:hover {
    background-color: #154A7C;
}
"""

with open('css/style.css', 'a', encoding='utf-8') as f:
    f.write(css_to_append)

print("CSS appended successfully.")
