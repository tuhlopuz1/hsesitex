import { useState, type FormEvent } from 'react'
import { buildAuthorizeUrl, REDIRECT } from '@/shared/auth'
import { Button, Card, Input } from '@/shared/ui'
import { usePasteLogin } from '../model/useLogin'
import s from './LoginFlow.module.css'

/**
 * Primary path: a normal OAuth redirect to our own /auth/callback — one click, no paste.
 * It only works if HSE's Keycloak has this origin whitelisted for the app's client; if not,
 * the user is bounced back with an error and can use the manual fallback below.
 */
export function LoginFlow() {
  const [value, setValue] = useState('')
  const paste = usePasteLogin()

  const startRedirect = () => {
    window.location.href = buildAuthorizeUrl(REDIRECT.web())
  }

  const submitPaste = (e: FormEvent) => {
    e.preventDefault()
    paste.mutate(value)
  }

  return (
    <Card className={s.card}>
      <div className={s.primary}>
        <p className={s.lead}>Вход через единую учётную запись ВШЭ.</p>
        <Button onClick={startRedirect}>Войти через ВШЭ</Button>
        <p className={s.hint}>
          Откроется страница входа saml.hse.ru. После входа вы вернётесь сюда автоматически. Пароль вводится только
          на сайте ВШЭ.
        </p>
      </div>

      <details className={s.fallback}>
        <summary>Вернуло на страницу с ошибкой? Ввести код вручную</summary>
        <div className={s.fallbackBody}>
          <p className={s.hint}>
            Если после входа браузер показал ошибку «не удаётся открыть страницу», скопируйте адрес из адресной
            строки (он содержит <code>code=</code>) и вставьте сюда. Если адрес не виден — DevTools → Network → запрос
            с <code>code=</code>.
          </p>
          <form className={s.form} onSubmit={submitPaste}>
            <Input
              placeholder="…?code=…"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              autoComplete="off"
              spellCheck={false}
            />
            <Button type="submit" variant="secondary" loading={paste.isPending} disabled={!value.trim()}>
              Войти по коду
            </Button>
          </form>
          {paste.isError && <p className={s.error}>{paste.error.message}</p>}
        </div>
      </details>
    </Card>
  )
}
