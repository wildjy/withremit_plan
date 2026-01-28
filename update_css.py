
css_to_append = """
/* Confirm Modal Buttons & Demo Buttons */
.modal-btn-group {
    display: flex;
    gap: 12px;
    margin-top: 24px;
    width: 100%;
}

.modal-btn-group button {
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
    flex: 1; /* Narrower */
}

.btn-confirm-action {
    background-color: #1B5E9E;
    color: #FFFFFF;
    flex: 2; /* Wider */
}

.btn-confirm-action:hover {
    background-color: #154A7C;
}

/* Demo Guide Buttons */
.demo-btn {
    padding: 10px 20px;
    border-radius: 8px;
    font-weight: 600;
    font-size: 14px;
    color: white;
    cursor: pointer;
    transition: opacity 0.2s;
    border: none;
}

.btn-success { background-color: #00A0DC; }
.btn-warning { background-color: #f59e0b; }
.btn-blue { background-color: #1B5E9E; }
"""

# Read content to check if we already appended part of it to avoid duplication?
# Actually, the previous attempts failed, except possibly the first one which added some classes but not the flex ones?
# Let's read the file first to be safe.

with open('css/style.css', 'r', encoding='utf-8') as f:
    content = f.read()

# Remove the previous attempt's partial addition if it exists (lines 9411-9442 approximately)
# The previous append added .modal-btn-group, .btn-cancel, etc. but WITHOUT flex: 1/2.
# We should try to replace that block or just append this new one at the end and rely on cascade?
# Better to replace if we can find it.

# Simple approach: If ".btn-confirm-action:hover" is near the end, we can try to find the block and replace it.
# Or just append, since CSS cascade will take the last definition.
# BUT, we want to be clean.
# Let's just append for now to ensure it works, as specificity is the same.
# Wait, if we append, we might have duplicate rules.
# Let's try to remove the old block if found.

old_block_start = "/* Confirm Modal Buttons */"
if old_block_start in content:
    # Find the start index
    idx = content.rfind(old_block_start)
    # Truncate file at idx
    content = content[:idx]
    
with open('css/style.css', 'w', encoding='utf-8') as f:
    f.write(content + css_to_append)

print("CSS updated/appended successfully.")
