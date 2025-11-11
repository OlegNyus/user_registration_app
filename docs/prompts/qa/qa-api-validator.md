---
alwaysApply: false
---
# qa-api-validator

# Test Run and Bug Management Workflow

## Overview
This workflow automatically runs tests, analyzes failures, marks bugs, and creates reports. The agent executes all steps sequentially without asking questions.

---

## Agent Behavior

**CRITICAL: The agent will NOT ask "What would you like to do?" or present options.**

**The agent will automatically:**
1. Execute the test suite immediately
2. Analyze all failures
3. Mark bugs and fix false positives
4. Generate bug report
5. Verify counts

**Do it automatically - DO NOT ask for permission or present options**

---

## Automatic Workflow Execution

**The agent executes these steps automatically in order:**

1. ✅ **Running automated tests** - Execute test suite immediately
2. 🔍 **Analyzing failures** - Categorize as real bugs or false positives
3. 🏷️ **Marking real bugs** - Add "BUG" prefix and `.skip` to bug tests
4. 📊 **Creating bug report** - Generate detailed summary
5. ✔️ **Verifying counts** - Confirm skipped tests = bug count

**No user input required - the workflow runs automatically**

---

## Step 1: Run All Tests (Automatic - DO NOT ASK)

**The agent will immediately execute:**

```bash
npx cypress run --spec "[test file path]"
```

The agent will:
- Run all tests in the specified test file immediately
- Capture test results (passed/failed)
- Record failure details for each failed test
- Proceed automatically to Step 2 without asking

**DO NOT present "Option 1: Run Tests" - JUST RUN THEM**

---

## Step 2: Analyze Test Results (Automatic)

**The agent will review each failed test and determine:**

1. **Is this a real bug in the application?**
   - API returns incorrect status code
   - API returns incorrect data
   - Business logic is broken
   - Required fields are not validated properly

2. **Is this a false positive (test issue)?**
   - Test uses incorrect expected values
   - Test has wrong assertions
   - Test data is incorrect
   - Test logic is flawed
   - Error message validation is incorrect

**The agent will automatically categorize each failure as:**
- ✅ **REAL BUG** - Application defect
- ❌ **FALSE POSITIVE** - Test needs fixing

---

## Step 3: Mark Tests with Bugs (Automatic)

**For tests that failed due to REAL BUGS, the agent will:**

1. **Add "BUG" prefix to the test title**
2. **Skip the test using `.skip`**

**Example:**

**Before:**
```javascript
it('Create Subscription with invalid billing cycle - POST /subscription', () => {
  // test code
});
```

**After:**
```javascript
it.skip('BUG - Create Subscription with invalid billing cycle - POST /subscription', () => {
  // test code
});
```

**For tests that are FALSE POSITIVES, the agent will:**
- Fix the test
- Do NOT add "BUG" prefix
- Do NOT skip the test
- Clean up code: remove console.log, commented lines, unused code
- Ensure code follows framework standards

---

## Step 4: Create Bug Report Summary (Automatic)

**The agent will automatically generate:**

```
Bug Report Summary:
-------------------
Total Tests Run: [number]
Passed: [number]
Failed: [number]
Real Bugs Found: [number]
False Positives Fixed: [number]

Bug List:
1. BUG - [Test Case Title]
   - Test File: [file path]
   - Expected: [what should happen]
   - Actual: [what actually happened]
   - Error/Response: [actual error or response from API]

2. BUG - [Test Case Title]
   - Test File: [file path]
   - Expected: [what should happen]
   - Actual: [what actually happened]
   - Error/Response: [actual error or response from API]

[Continue for all bugs...]
```

---

## Step 5: Verify Bug Count (Automatic)

**The agent will verify:**

```
Verification:
- Tests Marked with "BUG" prefix: [number]
- Tests Skipped: [number]
- ✅ Verification: Skipped Tests = Bug Count
```

**CRITICAL CHECK:**
```
Number of Skipped Tests = Number of Bugs
```

If these numbers don't match, the agent will report the discrepancy!

---

## Critical Rules

### ⚠️ DO NOT

1. **DO NOT come up with any tests**
   - Only work with existing automated tests
   - Do not create new tests during this workflow

2. **DO NOT test undefined requirements**
   - Only verify behavior defined in requirements
   - No guessing about expected behavior

3. **DO NOT create assumption-based tests**
   - If expected behavior is unclear, ASK
   - Do not assume what the correct behavior should be

4. **DO NOT skip error message verification**
   - Verify ONLY real error messages from actual API responses
   - Do not validate error messages that were assumed or guessed
   - Capture actual error messages from failed requests

5. **DO NOT use vague assertions**
   - ❌ WRONG: `expect(response.status).to.be.oneOf([400, 422]);` - Too vague!
   - ❌ WRONG: `expect(response.body.message).to.exist;` - Not specific enough
   - ✅ CORRECT: `expect(response.status).to.eq(400);` - Precise!

### ✅ DO

1. **Test ONLY known requirements**
   - Follow the requirements documentation
   - Requirements screenshots are the source of truth

2. **Double-check counts**
   - Verify total failed tests
   - Verify number of bugs
   - Verify number of skipped tests
   - Ensure: Skipped Tests = Bugs

3. **Verify actual error messages**
   - Run the test to see actual API response
   - Use real error messages in assertions
   - Document actual vs expected error messages

4. **Be thorough in false positive analysis**
   - Check test logic carefully
   - Verify test data is correct
   - Confirm assertions match requirements

5. **Use precise, explicit assertions**
   - ✅ CORRECT:
     ```javascript
     expect(response.status).to.eq(400); // Precise status code
     expect(response.body).to.have.property('error', true);
     expect(response.body).to.have.property('message');
     expect(response.body.message).to.contain(errorMessages.requiredFieldError);
     ```
   - Always use exact status codes
   - Validate response structure explicitly
   - Use error message constants from framework

---

## Example Workflow Execution

### Initial Test Run Results:
```
Tests Run: 20
Passed: 15
Failed: 5
```

### Analysis:
```
Failed Test 1: "Create user with invalid email - POST /user"
- Analysis: API should return 400 but returns 500
- Category: REAL BUG
- Action: Add "BUG" prefix and skip

Failed Test 2: "Get user by ID - GET /user/{id}"
- Analysis: Test expects status 200, but API correctly returns 404 for non-existent user
- Category: FALSE POSITIVE
- Action: Fix test expectations

Failed Test 3: "Update subscription without required field - PUT /subscription"
- Analysis: API doesn't validate required field, accepts invalid request
- Category: REAL BUG
- Action: Add "BUG" prefix and skip

Failed Test 4: "Delete payment method - DELETE /payment-method/{id}"
- Analysis: Test uses wrong endpoint URL
- Category: FALSE POSITIVE
- Action: Fix test endpoint

Failed Test 5: "Create payment with negative amount - POST /payment"
- Analysis: API accepts negative amount, should return 400
- Category: REAL BUG
- Action: Add "BUG" prefix and skip
```

### Final Report:
```
Bug Report Summary:
-------------------
Total Bugs Found: 3
Tests Fixed (False Positives): 2
Tests Skipped: 3 ✅ (matches bug count)

Bug List:
1. BUG - Create user with invalid email - POST /user
   - Test File: cypress/e2e/user.spec.js
   - Expected: Status 400 with validation error
   - Actual: Status 500 Internal Server Error
   - Error: "Internal server error occurred"

2. BUG - Update subscription without required field - PUT /subscription
   - Test File: cypress/e2e/subscription.spec.js
   - Expected: Status 400, error: "Field 'billingCycle' is required"
   - Actual: Status 200, subscription updated successfully
   - Error: No error returned

3. BUG - Create payment with negative amount - POST /payment
   - Test File: cypress/e2e/payment.spec.js
   - Expected: Status 400, error: "Amount must be greater than 0"
   - Actual: Status 200, payment created with negative amount
   - Error: No error returned
```

---

## Important Reminders

1. **Always analyze WHY a test failed before marking it as a bug**
2. **Number of skipped tests MUST equal number of bugs**
3. **Only mark REAL bugs, not test issues**
4. **Document actual API responses for all bugs**
5. **Do not assume expected behavior - verify against requirements**
6. **Ask if requirements are unclear**

---

## Questions to Ask When Analyzing Failures

Before marking a test as a bug, ask yourself:

1. ✅ Is this behavior documented in the requirements?
2. ✅ Is my expected result correct according to requirements?
3. ✅ Is my test data valid?
4. ✅ Are my assertions correct and precise (no vague assertions)?
5. ✅ Did I use the correct endpoint/method?
6. ✅ Is the error message I'm validating the real one from the API?
7. ✅ For required fields: Did I test missing field, wrong data type, and null value?
8. ✅ Am I using exact status codes (not `.oneOf([400, 422])`)?

If you answer "No" or "Not sure" to any question → It might be a FALSE POSITIVE, not a bug!

---

## Test Quality Checklist

When reviewing tests during analysis, verify:

**Required Field Validation:**
- [ ] Each required field has a test for missing field
- [ ] Each required field has a test for wrong data type
- [ ] Each required field has a test for null value
- [ ] Each required field has a positive test with correct data type

**Assertion Quality:**
- [ ] All assertions use exact status codes (e.g., `.eq(400)`)
- [ ] No vague assertions (e.g., `.oneOf([400, 422])` or `.to.exist`)
- [ ] Response structure is validated explicitly
- [ ] Error messages use constants from framework
- [ ] Values are validated precisely, not just for existence

**Code Quality:**
- [ ] No console.log() or debugging statements
- [ ] No commented out code
- [ ] No unused variables or imports
- [ ] No TODO comments
- [ ] Proper indentation and formatting
- [ ] Follows framework coding standards

**Test Data:**
- [ ] Real data from preconditions (no hardcoded IDs)
- [ ] Test data matches requirements
- [ ] Data types are correct

If tests don't meet these criteria → They are FALSE POSITIVES that need fixing

---