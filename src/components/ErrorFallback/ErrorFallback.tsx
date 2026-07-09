import styles from "./ErrorFallback.module.scss";
import { Button } from "../utilities/Button/Button";
import { Heading } from "../utilities/Heading/Heading";
import { Wrapper } from "../utilities/Wrapper/Wrapper";

type ErrorFallbackProps = {
  title?: string;
  message?: string;
};

export function ErrorFallback({
  title = "Something went wrong",
  message = "Sorry, something unexpected happened. Please refresh the page and try again.",
}: ErrorFallbackProps) {
  return (
    <main role="alert" aria-labelledby="error-title">
      <Wrapper>
        <div className={styles.content}>
          <div>
            <p className={styles.eyebrow}>Application error</p>
            <Heading tag="h1" size="h1" id="error-title">
              {title}
            </Heading>
          </div>

          <p>{message}</p>

          <Button onClick={() => window.location.reload()}>Reload Page</Button>
        </div>
      </Wrapper>
    </main>
  );
}
