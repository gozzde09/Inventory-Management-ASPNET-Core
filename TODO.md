# Refactoring and Cleaning Plan for Lagerhantering Project

## Information Gathered

- **Frontend HTML Files**: Extensive use of Bootstrap classes (e.g., `btn`, `form-control`, `container`, `row`, `col-*`, `card`, `table`, etc.) which are necessary for UI styling. Also uses Bootstrap Icons (`bi-*`).
- **Inline Styles**: Found in `app.html` (height and cursor for images) and `add-item-form.html` (cursor for tooltip icon).
- **Empty Elements**: Three empty `<div class="mb-2"></div>` in `overview.html`.
- **Repetitive Validation Messages**: In `add-item-form.html`, `edit-item-form.html`, and `stock-update-form.html`, validation messages are repeated with similar logic.
- **Custom Classes**: Classes like `btn-blue`, `text-blue`, `blue-icon`, `table-header-custom`, `current-quantity`, `radio-group`, `bg-yellow`, `bg-red` are defined and used.
- **Unnecessary Attributes**: Repeated `id="table-header-custom"` in `item-list.html`.
- **TypeScript Files**: Imports appear to be used; no obvious unused imports in reviewed files.
- **Backend C# Files**: Using statements are used; no obvious unused code in reviewed files.
- **CSS Files**: Custom overrides for Bootstrap in `styles.css`; specific classes in `overview.css`.

## Plan

1. **Move Inline Styles to CSS**:

   - Add styles for image heights and cursor pointers to `styles.css`.
   - Remove `style` attributes from `app.html` and `add-item-form.html`.

2. **Remove Empty Elements**:

   - Remove the three empty `<div class="mb-2"></div>` from `overview.html`.

3. **Simplify Validation Messages**:

   - Create a custom validator or helper function in TypeScript to reduce repetitive validation logic in forms.
   - Update `add-item-form.html`, `edit-item-form.html`, and `stock-update-form.html` to use simplified messages.

4. **Remove Unnecessary Attributes**:

   - Remove duplicate `id="table-header-custom"` in `item-list.html`.

5. **Check for Unused Custom Classes**:

   - Verify usage of custom classes like `blue-icon`, `table-header-custom`, `current-quantity`, `radio-group`.
   - Remove any unused classes from CSS files.

6. **Clean TypeScript Files**:

   - Review all TypeScript files for unused imports or variables.
   - Remove any found unused code.

7. **Clean Backend Files**:

   - Review C# files for unused using statements or dead code.
   - Remove any found unused elements.

8. **General Cleanup**:
   - Ensure consistent formatting and remove any trailing spaces or unnecessary comments.

## Dependent Files to Edit

- `frontend/src/app/app.html`
- `frontend/src/app/components/add-item-form/add-item-form.html`
- `frontend/src/app/pages/overview/overview.html`
- `frontend/src/app/components/edit-item-form/edit-item-form.html`
- `frontend/src/app/components/stock-update-form/stock-update-form.html`
- `frontend/src/app/pages/items/item-list.html`
- `frontend/src/styles.css`
- `frontend/src/app/pages/overview/overview.css`
- All TypeScript files (for imports and validation logic)
- Backend C# files (for usings and code)

## Followup Steps

- Test the application after changes to ensure functionality is intact.
- Run the frontend and backend to verify no broken styles or functionality.
- If needed, update any tests or documentation.
