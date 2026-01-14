# Echo Sign - Fixes Checklist

## Overview
This checklist tracks all fixes needed based on the comprehensive review.

---

## CRITICAL (Do This Week)

### Login Modal Issue
- [ ] Update `components/landing/hero-section.tsx`
  - [ ] Remove `import Link from "next/link"`
  - [ ] Add `import { useState } from "react"`
  - [ ] Add `import { LoginDialog } from "@/components/login-dialog"`
  - [ ] Create state: `const [loginOpen, setLoginOpen] = useState(false)`
  - [ ] Replace `<Link href="/login">` with `<LoginDialog><button>...</button></LoginDialog>`
  
- [ ] Update `components/landing/final-cta-section.tsx`
  - [ ] Remove `import Link from "next/link"`
  - [ ] Add `import { LoginDialog } from "@/components/login-dialog"`
  - [ ] Replace `<Link href="/login">` with `<LoginDialog><button>...</button></LoginDialog>`

- [ ] Verify:
  - [ ] Click "Sign In" opens modal on hero section
  - [ ] Click "Already Have Account?" opens modal on CTA section
  - [ ] Modal closes properly
  - [ ] No navigation to /login page
  - [ ] Works on mobile

---

## HIGH (Error Handling)

### Replace alert() with Toast

- [ ] `components/sign-dialog.tsx`
  - [ ] Add `import { showToast } from "@/lib/toast"`
  - [ ] Line 38: Replace `alert("A name is required...")` → `showToast.error("A name is required...")`
  - [ ] Line 46: Replace `alert("Unable to find workspace")` → `showToast.error("Unable to find workspace")`

- [ ] `components/create-space-dialog.tsx`
  - [ ] Add `import { showToast } from "@/lib/toast"`
  - [ ] Line 40: Replace `alert("No tenant found...")` → `showToast.error("No tenant found...")`

- [ ] `components/signature-canvas.tsx`
  - [ ] Add `import { showToast } from "@/lib/toast"`
  - [ ] Find and replace: `alert("Please provide a signature...")` → `showToast.error("Please provide a signature...")`

- [ ] `components/space-edit-dialog.tsx`
  - [ ] Add `import { showToast } from "@/lib/toast"`
  - [ ] Find and replace: `alert("Please select...")` → `showToast.error("Please select a visibility setting")`

- [ ] Verify:
  - [ ] All error messages appear as toasts (non-blocking)
  - [ ] Toast styling is consistent
  - [ ] Toast auto-dismisses
  - [ ] Works on mobile

---

## HIGH (UI Consistency)

### Button Styling Unification

- [ ] Create button style guide in `tailwind.config.ts` or new utility file
  - [ ] Define primary button classes
  - [ ] Define secondary button classes
  - [ ] Define disabled states
  - [ ] Define loading states
  - [ ] Define active/press states

- [ ] Audit all buttons:
  - [ ] `components/login-dialog.tsx` - button styling (line 159-165)
  - [ ] `components/create-space-dialog.tsx` - buttons (line 174-188)
  - [ ] `components/sign-dialog.tsx` - button in canvas area
  - [ ] `app/dashboard/layout.tsx` - logout button (line 169-176)
  - [ ] All other buttons across app

- [ ] Update buttons to use consistent classes:
  ```
  Primary: "bg-amber-700 text-white font-bold uppercase tracking-widest px-6 py-3 rounded-lg hover:bg-amber-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed active:scale-95"
  Secondary: "border border-stone-300 text-stone-900 font-medium px-6 py-2 rounded-lg hover:bg-stone-50 transition-colors disabled:opacity-50"
  ```

- [ ] Verify:
  - [ ] All primary buttons look identical
  - [ ] All secondary buttons look identical
  - [ ] Disabled states are consistent
  - [ ] Hover effects are consistent

### Dialog Styling Unification

- [ ] Create `components/ui/dialog-wrapper.tsx` (see QUICK_ACTION_PLAN.md for code)

- [ ] Update all dialogs to use wrapper:
  - [ ] `components/login-dialog.tsx` (line 111)
  - [ ] `components/sign-dialog.tsx` (line 98)
  - [ ] `components/create-space-dialog.tsx` (line 83)
  - [ ] `components/space-edit-dialog.tsx`
  - [ ] `components/delete-space-dialog.tsx`
  - [ ] `components/delete-entry-dialog.tsx`
  - [ ] `components/sign-wall-dialog.tsx`
  - [ ] `components/tenant-branding-dialog.tsx`

- [ ] Standardized sizes in wrapper:
  - [ ] sm: `sm:max-w-md`
  - [ ] md: `sm:max-w-lg`
  - [ ] lg: `sm:max-w-xl`
  - [ ] All with: `max-h-[90vh] overflow-y-auto`

- [ ] Verify:
  - [ ] All dialogs have consistent width
  - [ ] All dialogs have consistent height handling
  - [ ] All dialogs have consistent background (white)
  - [ ] All dialogs have consistent padding
  - [ ] Works on mobile

### Input Styling Unification

- [ ] Standardize input classes across all forms:
  ```
  Base: "w-full px-4 py-3 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-700/20 focus:border-amber-700 transition-all"
  Error: "border-red-500 ring-red-500"
  Disabled: "disabled:opacity-50 disabled:cursor-not-allowed"
  ```

- [ ] Update in:
  - [ ] `app/onboarding/_components/signup-form.tsx`
  - [ ] `components/login-dialog.tsx`
  - [ ] `components/sign-dialog.tsx`
  - [ ] `components/create-space-dialog.tsx`
  - [ ] All other form inputs

- [ ] Verify:
  - [ ] All input focus rings are same size
  - [ ] All input focus colors are same
  - [ ] All input borders are same color
  - [ ] All input padding is same
  - [ ] Error states look identical

### Label Styling Unification

- [ ] Standardize label classes:
  ```
  Standard: "text-xs font-bold uppercase tracking-widest text-stone-400 block"
  With space below: "text-xs font-bold uppercase tracking-widest text-stone-400 block mb-2"
  ```

- [ ] Update all labels to match this pattern
- [ ] Verify all form labels look identical

### Loading State Unification

- [ ] Create `components/ui/loading-spinner.tsx` (see QUICK_ACTION_PLAN.md for code)

- [ ] Update all loading states:
  - [ ] Replace inline spinner in `sign-dialog.tsx` (line 197-201)
  - [ ] Replace in `create-space-dialog.tsx`
  - [ ] Replace in `login-dialog.tsx`
  - [ ] Replace in signup form

- [ ] Use consistent pattern:
  ```tsx
  import { LoadingOverlay } from "@/components/ui/loading-spinner";
  
  {isSubmitting && <LoadingOverlay />}
  ```

- [ ] Verify:
  - [ ] All spinners look identical
  - [ ] All spinners have same color (amber-700)
  - [ ] All spinners have same size
  - [ ] All spinners have same animation

---

## MEDIUM (Metadata & Accessibility)

### Update Metadata

- [ ] Update `app/layout.tsx` (lines 33-36):
  ```tsx
  export const metadata: Metadata = {
    title: "Echo Sign - Digital Signature Walls",
    description: "Create digital signature walls where communities, families, and colleagues leave their mark. Preserve memories that matter.",
  };
  ```

- [ ] Verify:
  - [ ] Browser tab shows "Echo Sign - Digital Signature Walls"
  - [ ] Page appears correctly in search results

### Add ARIA Labels

- [ ] Add to `components/sign-dialog.tsx`:
  - [ ] Name input: `aria-label="Your Name / Alias"`
  - [ ] Email input: `aria-label="Email (Optional)"`
  - [ ] Memory textarea: `aria-label="Optional Memory"`
  - [ ] Signature canvas: `aria-label="Signature Drawing Area"`

- [ ] Add to `components/login-dialog.tsx`:
  - [ ] Subdomain input: Already has `aria-invalid` and `aria-describedby` ✅

- [ ] Add to `app/onboarding/_components/signup-form.tsx`:
  - [ ] Owner name: `aria-label="Your Name"`
  - [ ] Email: `aria-label="Email (Optional)"`
  - [ ] Subdomain: `aria-label="Subdomain"`
  - [ ] Add `aria-describedby` for error messages

- [ ] Add to all form inputs:
  - [ ] `aria-required="true"` for required fields
  - [ ] `aria-invalid={hasError}` for error states
  - [ ] `aria-describedby="fieldName-error"` for error messages

- [ ] Verify:
  - [ ] Screen reader announces all form fields
  - [ ] Screen reader announces required fields
  - [ ] Screen reader announces error messages
  - [ ] Keyboard navigation works

### Keyboard Navigation

- [ ] Test Tab key through all dialogs:
  - [ ] Can reach all inputs
  - [ ] Tab order is logical
  - [ ] Focus visible on all elements

- [ ] Test Escape key:
  - [ ] Closes modals
  - [ ] Returns focus to trigger element

---

## MEDIUM (Code Quality)

### Create Error Message Constants

- [ ] Create `lib/messages.ts`:
  ```tsx
  export const MESSAGES = {
    // Auth errors
    AUTH_NOT_FOUND: "Account not found. Please check your subdomain.",
    AUTH_DATA_CORRUPTED: "Account data corrupted. Please sign up again.",
    AUTH_ERROR: "An unexpected error occurred. Please try again.",
    
    // Form validation
    NAME_REQUIRED: "A name is required to associate with your signature.",
    WORKSPACE_NOT_FOUND: "Unable to find workspace",
    SIGNATURE_REQUIRED: "Please provide a signature first.",
    VISIBILITY_REQUIRED: "Please select a visibility setting",
    
    // Success messages
    LOGIN_SUCCESS: (name: string) => `Welcome back, ${name}! Redirecting...`,
    SIGNUP_SUCCESS: (name: string) => `Welcome, ${name}! Your wall is ready.`,
  };
  ```

- [ ] Replace all hardcoded error messages:
  - [ ] `components/login-dialog.tsx` - uses MESSAGES.AUTH_*
  - [ ] `components/sign-dialog.tsx` - uses MESSAGES.NAME_REQUIRED, MESSAGES.WORKSPACE_NOT_FOUND
  - [ ] `components/create-space-dialog.tsx` - uses MESSAGES.WORKSPACE_NOT_FOUND
  - [ ] `components/signature-canvas.tsx` - uses MESSAGES.SIGNATURE_REQUIRED
  - [ ] `components/space-edit-dialog.tsx` - uses MESSAGES.VISIBILITY_REQUIRED
  - [ ] All signup form messages

- [ ] Verify:
  - [ ] All messages use constants
  - [ ] No hardcoded strings in components
  - [ ] Easy to update messages globally

### Fix Console Logging

- [ ] Update `components/featured-memory.tsx` (line 32):
  ```tsx
  if (process.env.NODE_ENV === "development") {
    console.error("Error fetching reflection:", error);
  }
  ```

- [ ] Update `app/dashboard/spaces/page.tsx` (lines 105, 132):
  ```tsx
  if (process.env.NODE_ENV === "development") {
    console.warn("Clipboard API failed, trying fallback...", error);
  }
  ```

- [ ] Update `components/login-dialog.tsx` (line 101):
  ```tsx
  if (process.env.NODE_ENV === "development") {
    console.error(err);
  }
  ```

- [ ] Verify:
  - [ ] No console logs in production build
  - [ ] Logs still visible in dev mode

---

## MEDIUM (Type Safety)

### Add Error Boundary

- [ ] Create `components/error-boundary.tsx`:
  ```tsx
  'use client';
  
  import { ReactNode } from 'react';
  
  interface Props {
    children: ReactNode;
  }
  
  interface State {
    hasError: boolean;
    error: Error | null;
  }
  
  export class ErrorBoundary extends React.Component<Props, State> {
    constructor(props: Props) {
      super(props);
      this.state = { hasError: false, error: null };
    }
  
    static getDerivedStateFromError(error: Error): State {
      return { hasError: true, error };
    }
  
    componentDidCatch(error: Error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Error caught by boundary:', error);
      }
    }
  
    render() {
      if (this.state.hasError) {
        return (
          <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-red-600">Something went wrong</h2>
              <p className="text-gray-600">Please refresh the page</p>
            </div>
          </div>
        );
      }
  
      return this.props.children;
    }
  }
  ```

- [ ] Wrap main app:
  - [ ] Wrap `RootPage` in `page.tsx`
  - [ ] Wrap dashboard layout
  - [ ] Wrap onboarding page

- [ ] Verify:
  - [ ] Component errors are caught
  - [ ] User sees error message
  - [ ] App doesn't crash silently

### Create Error Type

- [ ] Create `lib/types/error.ts`:
  ```tsx
  export interface AppError extends Error {
    code?: string;
    statusCode?: number;
    context?: Record<string, unknown>;
  }
  
  export function isAppError(error: unknown): error is AppError {
    return error instanceof Error;
  }
  ```

- [ ] Use in error handlers:
  ```tsx
  try {
    // operation
  } catch (err) {
    const appError = isAppError(err) ? err : new Error(String(err));
    showToast.error(appError.message);
  }
  ```

---

## LOW (Future Improvements)

### Create Reusable Hooks

- [ ] Create `hooks/useFormState.ts` (reduces boilerplate):
  ```tsx
  export function useFormState<T>(initialData: T) {
    const [data, setData] = useState(initialData);
    const [errors, setErrors] = useState<ZodError | null>(null);
    const [isLoading, setIsLoading] = useState(false);
  
    const reset = () => {
      setData(initialData);
      setErrors(null);
      setIsLoading(false);
    };
  
    return { data, setData, errors, setErrors, isLoading, setIsLoading, reset };
  }
  ```

- [ ] Create `hooks/useAsync.ts`:
  ```tsx
  export function useAsync<T, E = string>(
    asyncFunction: () => Promise<T>,
    immediate = true
  ) {
    const [status, setStatus] = useState<'idle' | 'pending' | 'success' | 'error'>('idle');
    const [value, setValue] = useState<T | null>(null);
    const [error, setError] = useState<E | null>(null);
  
    // ... implementation
  }
  ```

### Add Analytics Events

- [ ] Track form submissions:
  - [ ] Login success/failure
  - [ ] Signup success/failure
  - [ ] Form validation errors

- [ ] Track error events:
  - [ ] Error type
  - [ ] Error message
  - [ ] Component where error occurred

### Create Component Library

- [ ] Document all components
- [ ] Create Storybook setup
- [ ] Document design patterns
- [ ] Create usage examples

---

## Verification Checklist

### Functional Testing
- [ ] Login from hero section (modal)
- [ ] Login from CTA section (modal)
- [ ] Signup flow works
- [ ] Create space works
- [ ] Sign space works
- [ ] All form validation works
- [ ] Error messages appear as toast
- [ ] Loading states show spinner
- [ ] Success messages appear
- [ ] All links work

### Visual Testing
- [ ] All buttons look consistent
- [ ] All dialogs look consistent
- [ ] All inputs look consistent
- [ ] All labels look consistent
- [ ] All spinners look consistent
- [ ] Dark mode (if applicable)
- [ ] Print view (if applicable)

### Responsive Testing
- [ ] Mobile (375px width)
- [ ] Tablet (768px width)
- [ ] Desktop (1024px+ width)
- [ ] Dialogs fit on mobile
- [ ] Touch targets are large enough (44px)
- [ ] Text is readable

### Accessibility Testing
- [ ] Keyboard navigation (Tab, Shift+Tab, Enter, Escape)
- [ ] Screen reader (NVDA, JAWS, or built-in)
- [ ] Color contrast (WCAG AA standard)
- [ ] Focus visible on all interactive elements
- [ ] Error messages announced

### Browser Testing
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Safari iOS
- [ ] Chrome Android

### Performance Testing
- [ ] First Contentful Paint < 1.5s
- [ ] Largest Contentful Paint < 2.5s
- [ ] Cumulative Layout Shift < 0.1
- [ ] No console errors
- [ ] No console warnings

---

## Sign-Off

- [ ] All CRITICAL fixes completed
- [ ] All HIGH fixes completed
- [ ] All MEDIUM fixes completed
- [ ] All verification tests passed
- [ ] Code reviewed
- [ ] Deployed to staging
- [ ] Deployed to production

**Completed by:** _______________  
**Date:** _______________  
**Notes:** _______________

