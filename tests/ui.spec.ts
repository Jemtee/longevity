import { test, expect } from '@playwright/test'

test.describe('Landing Page', () => {
  test('renders hero section with brand elements', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('text=Wellspring')).toBeVisible()
    await expect(page.locator('text=health deeply')).toBeVisible()
    await expect(page.locator('text=Start for free')).toBeVisible()
    await expect(page.locator('text=Sign in')).toBeVisible()
  })

  test('renders feature cards', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('text=Track 30+ biomarkers')).toBeVisible()
    await expect(page.locator('text=Evidence graded')).toBeVisible()
    await expect(page.locator('text=Personalized insights')).toBeVisible()
  })

  test('navigates to signup from CTA', async ({ page }) => {
    await page.goto('/')
    await page.click('text=Start for free')
    await expect(page).toHaveURL('/signup')
  })

  test('navigates to login from sign in link', async ({ page }) => {
    await page.goto('/')
    await page.locator('nav').getByText('Sign in').click()
    await expect(page).toHaveURL('/login')
  })
})

test.describe('Login Page', () => {
  test('renders login form with proper styling', async ({ page }) => {
    await page.goto('/login')
    await expect(page.locator('text=Welcome back')).toBeVisible()
    await expect(page.locator('#email')).toBeVisible()
    await expect(page.locator('#password')).toBeVisible()
    await expect(page.locator('text=Sign in').first()).toBeVisible()
    await expect(page.locator('text=Continue with Google')).toBeVisible()
  })

  test('has link to signup page', async ({ page }) => {
    await page.goto('/login')
    await page.click('text=Sign up')
    await expect(page).toHaveURL('/signup')
  })

  test('has link to forgot password', async ({ page }) => {
    await page.goto('/login')
    await page.click('text=Forgot password?')
    await expect(page).toHaveURL('/reset-password')
  })

  test('input fields have correct styling (no dark backgrounds)', async ({ page }) => {
    await page.goto('/login')
    const emailInput = page.locator('#email')
    const bgColor = await emailInput.evaluate((el) => {
      return window.getComputedStyle(el).backgroundColor
    })
    // Should be white or near-white, not dark
    expect(bgColor).toMatch(/rgb\(2[45]\d, 2[45]\d, 2[45]\d\)|rgb\(255, 255, 255\)/)
  })
})

test.describe('Signup Page', () => {
  test('renders signup form', async ({ page }) => {
    await page.goto('/signup')
    await expect(page.locator('text=Create your account')).toBeVisible()
    await expect(page.locator('#email')).toBeVisible()
    await expect(page.locator('#password')).toBeVisible()
    await expect(page.locator('#confirmPassword')).toBeVisible()
    await expect(page.locator('text=Create account').first()).toBeVisible()
  })

  test('has link back to login', async ({ page }) => {
    await page.goto('/signup')
    await page.click('text=Sign in')
    await expect(page).toHaveURL('/login')
  })
})

test.describe('Reset Password Page', () => {
  test('renders reset form', async ({ page }) => {
    await page.goto('/reset-password')
    await expect(page.locator('text=Reset password')).toBeVisible()
    await expect(page.locator('#email')).toBeVisible()
    await expect(page.locator('text=Send reset link')).toBeVisible()
  })

  test('has back to sign in link', async ({ page }) => {
    await page.goto('/reset-password')
    await page.click('text=Back to sign in')
    await expect(page).toHaveURL('/login')
  })
})

test.describe('Visual Consistency', () => {
  test('landing page has warm Scandinavian background', async ({ page }) => {
    await page.goto('/')
    const body = page.locator('body > div').first()
    const bgClass = await body.getAttribute('class')
    expect(bgClass).toContain('bg-gray-50')
  })

  test('auth pages have consistent logo treatment', async ({ page }) => {
    // Login
    await page.goto('/login')
    const loginLogo = page.locator('text=Wellspring').first()
    await expect(loginLogo).toBeVisible()

    // Signup
    await page.goto('/signup')
    const signupLogo = page.locator('text=Wellspring').first()
    await expect(signupLogo).toBeVisible()

    // Reset
    await page.goto('/reset-password')
    const resetLogo = page.locator('text=Wellspring').first()
    await expect(resetLogo).toBeVisible()
  })

  test('landing page has glassmorphic nav', async ({ page }) => {
    await page.goto('/')
    const nav = page.locator('nav')
    const navClass = await nav.getAttribute('class')
    expect(navClass).toContain('backdrop-blur')
  })
})
