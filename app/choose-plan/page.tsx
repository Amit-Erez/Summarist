"use client";

import styles from "./chooseplan.module.css";
import { AiFillFileText } from "react-icons/ai";
import { RiPlantFill } from "react-icons/ri";
import { FaHandshake } from "react-icons/fa";
import { PiCaretDown } from "react-icons/pi";
import { ImSpinner8 } from "react-icons/im";
import { useState } from "react";
import Footer from "@/components/Footer/Footer";
import { createCheckoutSession } from "@/utilities/createCheckoutSession";

export default function ChoosePlan() {
  const [active, setActive] = useState<boolean>(true);
  const [faq, setFaq] = useState<
    "" | "faqOne" | "faqTwo" | "faqThree" | "faqFour"
  >("");
  const [start, setStart] = useState<boolean>(false);

  return (
    <div className={styles.plan}>
      <div className={styles["plan__header--wrapper"]}>
        <div className={styles.plan__header}>
          <div className={styles.plan__title}>
            Get unlimited access to many amazing books to read
          </div>
          <div className={styles["plan__sub--title"]}>
            Turn ordinary moments into amazing learning opportunities
          </div>
          <figure className={styles["plan__img--mask"]}>
            <img src="/assets/pricing-top.png" alt="pricing" />
          </figure>
        </div>
      </div>
      <div className={styles.row}>
        <div className={styles.container}>
          <div className={styles["plan__features--wrapper"]}>
            <div className={styles.plan__features}>
              <div className={styles["plan__features--icon"]}>
                <AiFillFileText />
              </div>
              <div className={styles["plan__features--text"]}>
                <b>Key ideas in few min</b> with many books to read
              </div>
            </div>
            <div className={styles.plan__features}>
              <div className={styles["plan__features--icon"]}>
                <RiPlantFill />
              </div>
              <div className={styles["plan__features--text"]}>
                <b>3 million</b> people growing with Summarist everyday
              </div>
            </div>
            <div className={styles.plan__features}>
              <div className={styles["plan__features--icon"]}>
                <FaHandshake />
              </div>
              <div className={styles["plan__features--text"]}>
                <b>Precise recommendations</b> collections curated by experts
              </div>
            </div>
          </div>
          <div className={styles.section__title}>
            Choose the plan that fits you
          </div>
          <div
            className={`${styles["plan__card"]} ${
              active ? styles["plan__card--active"] : null
            }`}
            onClick={() => setActive(true)}
          >
            <div className={styles["plan__card--circle"]}>
              {active && <div className={styles["plan__card--dot"]}></div>}
            </div>
            <div className={styles["plan__card--content"]}>
              <div className={styles["plan__card--title"]}>
                Premium Plus Yearly
              </div>
              <div className={styles["plan__card--price"]}>$99.99/year</div>
              <div className={styles["plan__card--text"]}>
                7-day free trial included
              </div>
            </div>
          </div>
          <div className={styles["plan__card--separator"]}>
            <div className={styles.plan__separator}>or</div>
          </div>
          <div
            className={`${styles["plan__card"]} ${
              active ? null : styles["plan__card--active"]
            }`}
            onClick={() => setActive(false)}
          >
            <div className={styles["plan__card--circle"]}>
              {!active && <div className={styles["plan__card--dot"]}></div>}
            </div>
            <div className={styles["plan__card--content"]}>
              <div className={styles["plan__card--title"]}>Premium Monthly</div>
              <div className={styles["plan__card--price"]}>$9.99/month</div>
              <div className={styles["plan__card--text"]}>
                No trial included
              </div>
            </div>
          </div>
          <div className={styles["plan__card--cta"]}>
            <span className={styles["btn--wrapper"]}>
              <button
                className={styles.btn}
                onClick={async () => {
                  try {
                    setStart(true);
                    const priceId = active
                      ? "price_1SNhaTQrOaFGUgPBJmsRjcKv" // yearly plan (free trial)
                      : "price_1SNhaTQrOaFGUgPB6kHXdVnD"; // monthly plan
                    await createCheckoutSession(priceId);
                  } catch (error) {
                    console.error("Checkout error:", error);
                    setStart(false);
                  }
                }}
              >
                {start ? (
                  <div className={styles["spinner__icon--wrapper"]}>
                    <ImSpinner8 />
                  </div>
                ) : active ? (
                  <span>Start your free 7-day trial</span>
                ) : (
                  <span>Start your first month</span>
                )}
              </button>
            </span>
            {active ? (
              <div className={styles["plan__disclaimer"]}>
                Cancel your trial at any time before it ends, and you won’t be
                charged.
              </div>
            ) : (
              <div className={styles["plan__disclaimer"]}>
                30-day money back guarantee, no questions asked.
              </div>
            )}
          </div>
          <div className={styles.faq__wrapper}>
            <div className={styles.accordion__card}>
              <div
                className={styles.accordion__header}
                onClick={() => {
                  if (faq === "faqOne") {
                    setFaq("");
                  } else {
                    setFaq("");
                    setTimeout(() => setFaq("faqOne"), 100);
                  }
                }}
              >
                <div className={styles.accordion__title}>
                  How does the free 7-day trial work?
                </div>
                <PiCaretDown
                  className={`${styles.accordion__icon} ${
                    faq === "faqOne" && styles["accordion__icon--rotate"]
                  }`}
                />
              </div>
              <div
                className={`${styles.collapse} ${
                  faq === "faqOne" && styles.show
                }`}
              >
                <div className={styles.accordion__body}>
                  "Begin your complimentary 7-day trial with a Summarist annual
                  membership. You are under no obligation to continue your
                  subscription, and you will only be billed when the trial
                  period expires. With Premium access, you can learn at your own
                  pace and as frequently as you desire, and you may terminate
                  your subscription prior to the conclusion of the 7-day free
                  trial."
                </div>
              </div>
            </div>
            <div className={styles.accordion__card}>
              <div
                className={styles.accordion__header}
                onClick={() => {
                  if (faq === "faqTwo") {
                    setFaq("");
                  } else {
                    setFaq("");
                    setTimeout(() => setFaq("faqTwo"), 100);
                  }
                }}
              >
                <div className={styles.accordion__title}>
                  Can I switch subscriptions from monthly to yearly, or yearly
                  to monthly?
                </div>
                <PiCaretDown
                  className={`${styles.accordion__icon} ${
                    faq === "faqTwo" && styles["accordion__icon--rotate"]
                  }`}
                />
              </div>
              <div
                className={`${styles.collapse} ${
                  faq === "faqTwo" && styles.show
                }`}
              >
                <div className={styles.accordion__body}>
                  "While an annual plan is active, it is not feasible to switch
                  to a monthly plan. However, once the current month ends,
                  transitioning from a monthly plan to an annual plan is an
                  option."
                </div>
              </div>
            </div>
            <div className={styles.accordion__card}>
              <div
                className={styles.accordion__header}
                onClick={() => {
                  if (faq === "faqThree") {
                    setFaq("");
                  } else {
                    setFaq("");
                    setTimeout(() => setFaq("faqThree"), 100);
                  }
                }}
              >
                <div className={styles.accordion__title}>
                  What&apos;s included in the Premium plan?
                </div>
                <PiCaretDown
                  className={`${styles.accordion__icon} ${
                    faq === "faqThree" && styles["accordion__icon--rotate"]
                  }`}
                />
              </div>
              <div
                className={`${styles.collapse} ${
                  faq === "faqThree" && styles.show
                }`}
              >
                <div className={styles.accordion__body}>
                  "Premium membership provides you with the ultimate Summarist
                  experience, including unrestricted entry to many best-selling
                  books high-quality audio, the ability to download titles for
                  offline reading, and the option to send your reads to your
                  Kindle."
                </div>
              </div>
            </div>
            <div className={styles.accordion__card}>
              <div
                className={styles.accordion__header}
                onClick={() => {
                  if (faq === "faqFour") {
                    setFaq("");
                  } else {
                    setFaq("");
                    setTimeout(() => setFaq("faqFour"), 100);
                  }
                }}
              >
                <div className={styles.accordion__title}>
                  Can I cancel during my trial or subscription?
                </div>
                <PiCaretDown
                  className={`${styles.accordion__icon} ${
                    faq === "faqFour" && styles["accordion__icon--rotate"]
                  }`}
                />
              </div>
              <div
                className={`${styles.collapse} ${
                  faq === "faqFour" && styles.show
                }`}
              >
                <div className={styles.accordion__body}>
                  "You will not be charged if you cancel your trial before its
                  conclusion. While you will not have complete access to the
                  entire Summarist library, you can still expand your knowledge
                  with one curated book per day."
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
