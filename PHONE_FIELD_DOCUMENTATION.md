# Phone Field Country Code UI Component Documentation

## Overview
The `PhoneInputWrapper` component is a React-based, custom phone input field with integrated country code selection functionality. It provides users with an intuitive way to select their country and enter a phone number with automatic country dial code prefixing.

**Location**: [App.tsx:89-356](src/App.tsx#L89-L356)

---

## Features

### 1. **Country Selection Dropdown**
- Displays 31+ countries with their names, ISO codes, and dial codes
- Real-time search functionality to filter countries by:
  - Country name (e.g., "India")
  - Dial code (e.g., "+91")
  - ISO code (e.g., "in")

### 2. **Flag Display**
- Shows country flag icons fetched from `flagcdn.com`
- 20x14px flag images with subtle shadow effects
- Renders in both the dropdown button and country list

### 3. **Automatic Phone Formatting**
- Strips non-numeric characters automatically
- Prepends selected country dial code
- Maintains state across country changes
- Shows phone number without dial code in input field (clean UX)

### 4. **Smart Dropdown Behavior**
- Positioned above the input field to avoid keyboard overlap on mobile
- Click-outside detection to close dropdown
- Auto-focuses search input when dropdown opens
- Smooth fade-in animation (0.2s)
- Searchable with real-time filtering

---

## Component Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | Required | Full phone number including country code |
| `onChange` | `(value: string) => void` | Required | Callback fired when phone value changes |
| `required` | `boolean` | `false` | HTML5 required attribute |

---

## Supported Countries

The component includes 31 countries across 6 continents:

**Asia**: India (+91), Singapore (+65), Malaysia (+60), Indonesia (+62), Thailand (+66), Philippines (+63), Japan (+81), China (+86)

**Americas**: United States (+1), Canada (+1), Brazil (+55), Mexico (+52)

**Europe**: United Kingdom (+44), Germany (+49), France (+33), Italy (+39), Spain (+34), Netherlands (+31), Belgium (+32), Switzerland (+41), Austria (+43), Sweden (+46), Norway (+47), Denmark (+45), Poland (+48), Greece (+30)

**Middle East**: United Arab Emirates (+971), Saudi Arabia (+966)

**Oceania**: Australia (+61), New Zealand (+64)

**Africa**: South Africa (+27)

---

## Usage Example

```jsx
const [phone, setPhone] = useState('');

<PhoneInputWrapper
  value={phone}
  onChange={(newPhone) => setPhone(newPhone)}
  required
/>
```

**Output**: Full number with country code (e.g., `+919876543210`)

---

## Styling Architecture

### Container
- **Display**: Flex layout with gap: 0
- **Border**: 1px solid #e2e8f0, 8px border-radius
- **Background**: #f7f9fc with hover/focus transitions

### Country Selector Button
- **Width**: 110px minimum
- **Background**: #eef2f7 (hover: #e2e8f0)
- **Layout**: Flexbox with flag, dial code, and chevron
- **Icon**: Chevron rotates 180° when dropdown opens

### Dropdown Menu
- **Position**: Absolute, positioned above the button
- **Width**: 300px (90vw max on mobile)
- **Max Height**: 220px with vertical scroll
- **Z-Index**: 99999 (ensures overlay)
- **Animation**: `fadeIn` (0.2s ease)

### Search Input
- **Border**: 2px solid #3b82f6
- **Focus**: 2px solid #3b82f6 with rgba glow
- **Padding**: 8px 12px

### Phone Input Field
- **Border**: None (transparent)
- **Padding**: 12px 16px
- **Flex**: 1 (fills remaining space)
- **Placeholder**: "081234 56789" (example format)
- **Text Color**: #0a1628

---

## State Management

The component uses React hooks internally:

```typescript
const [showDropdown, setShowDropdown] = useState(false);
const [searchTerm, setSearchTerm] = useState('');
const [selectedCountry, setSelectedCountry] = useState(COUNTRIES[0]); // Default: India
```

**Refs** for DOM manipulation:
- `dropdownRef` — Container for click-outside detection
- `searchInputRef` — Auto-focus on dropdown open
- `buttonRef` — Country button reference

---

## Key Functions

### `handleSelectCountry(country)`
Updates selected country, closes dropdown, clears search, and resets phone input.

### `handlePhoneChange(e)`
Extracts only numeric characters and prefixes with dial code on change.

### `handlePhoneInputFocus(e)`
If input is empty on focus, prefixes with dial code to guide the user.

### `filteredCountries`
Real-time filtering by country name, dial code, or ISO code based on `searchTerm`.

---

## Accessibility Features

- ✅ HTML `<input type="tel">` for semantic phone input
- ✅ `required` attribute support
- ✅ `placeholder` text for format guidance
- ✅ Keyboard navigation (Escape to close, Tab to move through fields)
- ✅ Proper focus management with auto-focus on dropdown

---

## Known Behaviors

1. **Flag Images**: Served from CDN (`flagcdn.com`). Ensure external CDN access is available.
2. **Default Country**: Set to India (+91). Change `COUNTRIES[0]` in state initialization to set different default.
3. **Non-Numeric Stripping**: Only digits are preserved; +, (, ), spaces are removed on input.
4. **Full Value Storage**: Parent component receives complete number with country code (e.g., `+919876543210`).

---

## Data Flow

```
User selects country → selectedCountry state updates
                    ↓
         Button & flag icons update
                    ↓
User types numbers → Only digits captured
                    ↓
Dial code prepended → value = selectedCountry.dial + digits
                    ↓
onChange callback fires → Parent state updates
```

---

## Browser Compatibility

- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

---

## Performance Considerations

- Uses `useRef` for direct DOM access instead of unnecessary re-renders
- Click-outside detection uses event delegation (single listener)
- Country filtering is O(n) but acceptable for 31 countries
- No external dependencies beyond React and lucide-react icons

---

## Integration in Voice Agent Funnel

Used in the **Demo Request Form** ([App.tsx:818-826](src/App.tsx#L818-L826)):

```jsx
<label className="lbl" style={{ display: 'block', marginBottom: 6 }}>
  PHONE <span style={{ color: 'var(--danger)' }}>*</span>
</label>
<PhoneInputWrapper
  value={formData.phone}
  onChange={(phone: string) => setFormData(prev => ({ ...prev, phone }))}
  required
/>
```

Form data is sent to backend via `POST http://localhost:9045/api/leads` with structure:
```json
{
  "phone": "+919876543210",
  "full_name": "John Doe",
  "work_email": "john@company.com",
  ...
}
```

---

# Use Case Field with Conditional Custom Input Documentation

## Overview

The **Use Case Field** is a form component that combines a dropdown select with conditional rendering. When a user selects "Other" from the dropdown, an additional text input field is dynamically shown for them to specify their custom use case.

**Location**: [App.tsx:780-816](src/App.tsx#L780-L816)

---

## Component Structure

### 1. **Primary Dropdown Field**

```jsx
<div style={{ gridColumn: '1 / -1' }}>
  <label className="lbl" style={{ display: 'block', marginBottom: 6 }}>
    TARGET USE CASE <span style={{ color: 'var(--danger)' }}>*</span>
  </label>
  <select
    className="form-input"
    name="use_case"
    value={formData.use_case}
    onChange={handleInputChange}
    required
    style={{ cursor: 'pointer' }}
  >
    <option value="">Select use case...</option>
    <option value="Field Support">Field Support</option>
    <option value="Healthcare">Healthcare</option>
    <option value="Customer Care">Customer Care</option>
    <option value="Internal SOP">Internal SOP</option>
    <option value="Other">Other</option>
  </select>
</div>
```

**Grid Layout**: `gridColumn: '1 / -1'` — Takes full width in the 2-column form grid

**Predefined Options**:
- `Field Support` — Support staff in field locations
- `Healthcare` — Medical/healthcare providers
- `Customer Care` — Customer service teams
- `Internal SOP` — Internal standard operating procedures
- `Other` — Custom use case (triggers conditional field)

---

### 2. **Conditional Custom Input Field**

This field appears **only** when `formData.use_case === 'Other'`:

```jsx
{formData.use_case === 'Other' && (
  <div style={{ gridColumn: '1 / -1' }}>
    <label className="lbl" style={{ display: 'block', marginBottom: 6 }}>
      PLEASE SPECIFY <span style={{ color: 'var(--danger)' }}>*</span>
    </label>
    <input
      className="form-input"
      type="text"
      name="other_use_case"
      value={formData.other_use_case}
      onChange={handleInputChange}
      required={formData.use_case === 'Other'}
      placeholder="Describe your use case..."
    />
  </div>
)}
```

---

## Data Structure

The form uses two state fields to manage use case logic:

```typescript
interface FormData {
  use_case: string;           // Primary dropdown value
  other_use_case: string;     // Custom use case text input
  // ... other fields
}

const [formData, setFormData] = useState<FormData>({
  full_name: '',
  work_email: '',
  job_title: '',
  company_name: '',
  use_case: '',               // Stores selected option value
  other_use_case: '',         // Stores custom text when "Other" selected
  phone: ''
});
```

---

## Conditional Rendering Logic

### State Flow

```
1. User opens form
   ↓
   use_case = '' (empty)
   other_use_case field is NOT rendered
   
2. User selects "Field Support", "Healthcare", etc.
   ↓
   use_case = 'Field Support' (or other preset)
   other_use_case field still NOT rendered
   
3. User selects "Other"
   ↓
   use_case = 'Other'
   Condition: formData.use_case === 'Other' evaluates to TRUE
   ↓
   other_use_case field is NOW RENDERED
   
4. User types custom use case description
   ↓
   other_use_case = "My custom use case text..."
   
5. If user changes back to "Field Support"
   ↓
   use_case = 'Field Support'
   Condition: formData.use_case === 'Other' evaluates to FALSE
   ↓
   other_use_case field is HIDDEN (state preserved but not shown)
```

---

## Key Features

### 1. **Dynamic Visibility**
- Field appears/disappears instantly with no animation delay
- Uses React conditional rendering with `&&` operator
- State is preserved — switching back to "Other" retains the entered text

### 2. **Required Validation**
- Primary dropdown is always `required`
- Custom input has conditional `required` attribute:
  ```jsx
  required={formData.use_case === 'Other'}
  ```
- Ensures custom input is only mandatory when it appears

### 3. **Form Input Handler**
Both fields use the same `handleInputChange` function:

```typescript
const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
  const { name, value } = e.target;
  setFormData(prev => ({ ...prev, [name]: value }));
};
```

This works for both dropdown and text input because both have `name` attributes.

---

## Styling

### Container
- **Grid Column**: `1 / -1` (full width, spanning both columns)
- **Layout**: Stacked vertically with 16px gap

### Label
- **Font Weight**: 500 (medium)
- **Font Size**: 14px
- **Color**: Inherited from `.lbl` class
- **Margin Bottom**: 6px

### Select/Input Fields
- **Class**: `form-input` (shared styling with other inputs)
- **Border**: Typically 1px solid #e2e8f0
- **Padding**: 12px 16px
- **Border Radius**: 8px
- **Background**: #f7f9fc
- **Cursor**: `pointer` on select

### Placeholder Text
- **Custom Input**: "Describe your use case..."
- **Select**: "Select use case..." (first option)

---

## Backend Integration

When form is submitted, both fields are sent to the backend:

```json
{
  "use_case": "Other",
  "other_use_case": "My custom use case description",
  "full_name": "John Doe",
  "work_email": "john@company.com",
  "phone": "+919876543210",
  "company_name": "Acme Corp",
  "job_title": "VP Support"
}
```

Backend receives:
- `use_case`: Either a predefined value or `"Other"`
- `other_use_case`: Empty string if "Other" not selected, otherwise contains user input

---

## Implementation in Other Sites

To replicate this pattern in other funnel sites:

### Step 1: Define FormData Interface
```typescript
interface FormData {
  use_case: string;
  other_use_case: string;
  // ... other fields
}
```

### Step 2: Initialize State
```typescript
const [formData, setFormData] = useState<FormData>({
  use_case: '',
  other_use_case: '',
  // ... other initial values
});
```

### Step 3: Create Input Handler
```typescript
const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
  const { name, value } = e.target;
  setFormData(prev => ({ ...prev, [name]: value }));
};
```

### Step 4: Render Select Dropdown
```jsx
<div style={{ gridColumn: '1 / -1' }}>
  <label className="lbl" style={{ display: 'block', marginBottom: 6 }}>
    FIELD LABEL <span style={{ color: 'var(--danger)' }}>*</span>
  </label>
  <select
    className="form-input"
    name="use_case"
    value={formData.use_case}
    onChange={handleInputChange}
    required
  >
    <option value="">Select option...</option>
    <option value="Option 1">Option 1</option>
    <option value="Option 2">Option 2</option>
    <option value="Other">Other</option>
  </select>
</div>
```

### Step 5: Add Conditional Rendering
```jsx
{formData.use_case === 'Other' && (
  <div style={{ gridColumn: '1 / -1' }}>
    <label className="lbl" style={{ display: 'block', marginBottom: 6 }}>
      PLEASE SPECIFY <span style={{ color: 'var(--danger)' }}>*</span>
    </label>
    <input
      className="form-input"
      type="text"
      name="other_use_case"
      value={formData.other_use_case}
      onChange={handleInputChange}
      required={formData.use_case === 'Other'}
      placeholder="Describe your option..."
    />
  </div>
)}
```

---

## Customization Options

### Change Trigger Value
```jsx
{formData.use_case === 'Custom' && (  // Change "Other" to "Custom"
  // conditional field
)}
```

### Modify Dropdown Options
Edit the `<option>` elements to add/remove predefined options.

### Change Placeholder Text
```jsx
placeholder="Enter your specific use case here..."
```

### Add Multiple Conditional Fields
```jsx
{formData.use_case === 'Option1' && (
  <div>...</div>
)}

{formData.use_case === 'Option2' && (
  <div>...</div>
)}
```

### Add Transition Animation
```jsx
{formData.use_case === 'Other' && (
  <div style={{ 
    animation: 'slideIn 0.3s ease-out',
    gridColumn: '1 / -1' 
  }}>
    {/* ... field content ... */}
  </div>
)}
```

---

## Common Patterns

### Pattern 1: Multiple Conditional Fields (Different Triggers)
```jsx
{formData.use_case === 'Healthcare' && (
  <HealthcareSpecificField />
)}

{formData.use_case === 'Enterprise' && (
  <EnterpriseSpecificField />
)}

{formData.use_case === 'Other' && (
  <CustomUseCaseField />
)}
```

### Pattern 2: Nested Conditionals
```jsx
{formData.use_case === 'Other' && (
  <>
    <CustomInput />
    {formData.other_use_case.length > 10 && (
      <AdditionalVerificationField />
    )}
  </>
)}
```

### Pattern 3: Dynamic Required Validation
```jsx
<input
  required={formData.use_case === 'Other'}
  pattern={formData.use_case === 'Other' ? '.{10,}' : undefined}
  title="Please enter at least 10 characters"
/>
```

---

## Accessibility Features

- ✅ Label properly associated with select via semantic HTML
- ✅ `required` attribute communicates mandatory fields
- ✅ `placeholder` provides additional guidance
- ✅ Conditional field appears in DOM flow naturally
- ✅ Screen readers announce field dynamically

---

## Known Behaviors & Edge Cases

1. **State Preservation**: Switching from "Other" back to "Other" retains previously entered text
2. **Empty Required Field**: If user selects "Other" but doesn't fill the input, form submission fails
3. **Submission with Cleared Field**: If user enters text, then switches to "Field Support", `other_use_case` is sent as empty string (not null)
4. **No Transition Animation**: Field appears instantly — add CSS if smoother UX desired

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Conditional field not appearing | Check that `formData.use_case === 'Other'` matches exactly the option value |
| Conditional field required validation fails | Ensure `required={formData.use_case === 'Other'}` is set |
| Value not updating | Verify `handleInputChange` is attached to both elements and `name` attributes match state keys |
| Text persists after hiding | This is expected behavior; clear state manually if needed |

---

## Customization Guide

### Add More Countries
Edit the `COUNTRIES` array at [App.tsx:23-55](src/App.tsx#L23-L55):
```typescript
{ isoCode: 'fr', name: 'France', dial: '+33' },
```

### Change Default Country
```typescript
const [selectedCountry, setSelectedCountry] = useState(COUNTRIES.find(c => c.isoCode === 'us') || COUNTRIES[0]);
```

### Adjust Dropdown Width
Change `width: '300px'` in the dropdown div styles.

### Modify Colors
Update hex values in inline styles (currently: #e2e8f0, #3b82f6, #0a1628).

---

## Future Enhancements

- [ ] International phone format validation (libphonenumber)
- [ ] Geolocation-based country pre-selection
- [ ] Phone number formatting mask (e.g., +91 98765 43210)
- [ ] Country favorites / recent selections
- [ ] Accessibility improvements (ARIA labels)
- [ ] TypeScript strict type checking for country objects
