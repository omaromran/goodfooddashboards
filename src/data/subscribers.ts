/**
 * GoodAI Subscribers — weekly subscription flows vs active-customer stock.
 *
 * Illustrative Q1 FY2026-shaped weeks: new + reactivated subscriptions exceed
 * cancellations every week (net subscription flow is positive), while the
 * 90-day active-customer count still falls because of skips / inactivity.
 * Levels are rounded to match publicly reported ~65–66K active customers.
 */

export interface SubscriberWeek {
  week: string;
  startingSubscribers: number;
  endingSubscribers: number;
  entering: number;
  exiting: number;
  /** Exits plotted below the axis (always −exiting). */
  exitingBar: number;
  /** entering − exiting. Positive ⇒ more people joined than left. */
  netFlow: number;
  /** Logo churn: exiting / starting subscribers. Always ≥ 0. */
  churnRatePct: number;
  /** Net subscription change as % of starting base. Same sign as netFlow. */
  netFlowPct: number;
  startingActive: number;
  endingActive: number;
  lapses: number;
  activeReturners: number;
  /** Week-over-week change in 90-day active customers. Can be negative. */
  activeNet: number;
}

const RAW_WEEKS: {
  week: string;
  entering: number;
  exiting: number;
  lapses: number;
  activeReturners: number;
}[] = [
  { week: "Jan 5", entering: 1180, exiting: 740, lapses: 930, activeReturners: 390 },
  { week: "Jan 12", entering: 1240, exiting: 810, lapses: 960, activeReturners: 420 },
  { week: "Jan 19", entering: 1090, exiting: 770, lapses: 770, activeReturners: 360 },
  { week: "Jan 26", entering: 1310, exiting: 860, lapses: 1020, activeReturners: 440 },
  { week: "Feb 2", entering: 1150, exiting: 790, lapses: 840, activeReturners: 380 },
  { week: "Feb 9", entering: 1220, exiting: 720, lapses: 1030, activeReturners: 410 },
  { week: "Feb 16", entering: 1060, exiting: 680, lapses: 810, activeReturners: 350 },
  { week: "Feb 23", entering: 1190, exiting: 830, lapses: 870, activeReturners: 400 },
  { week: "Mar 2", entering: 1270, exiting: 750, lapses: 1090, activeReturners: 430 },
  { week: "Mar 9", entering: 1110, exiting: 700, lapses: 870, activeReturners: 370 },
  { week: "Mar 16", entering: 1200, exiting: 780, lapses: 930, activeReturners: 390 },
  { week: "Mar 23", entering: 1140, exiting: 710, lapses: 860, activeReturners: 360 },
];

export function buildSubscriberWeeks(
  startingSubscribers = 71_800,
  startingActive = 66_200,
): SubscriberWeek[] {
  let subs = startingSubscribers;
  let active = startingActive;

  return RAW_WEEKS.map((row) => {
    if (row.entering <= row.exiting) {
      throw new Error(`Entering must exceed exiting in ${row.week}`);
    }

    const netFlow = row.entering - row.exiting;
    const churnRatePct = (row.exiting / subs) * 100;
    const netFlowPct = (netFlow / subs) * 100;
    const endingSubscribers = subs + netFlow;
    const activeNet = row.entering + row.activeReturners - row.exiting - row.lapses;
    const endingActive = active + activeNet;

    const week: SubscriberWeek = {
      week: row.week,
      startingSubscribers: subs,
      endingSubscribers,
      entering: row.entering,
      exiting: row.exiting,
      exitingBar: -row.exiting,
      netFlow,
      churnRatePct,
      netFlowPct,
      startingActive: active,
      endingActive,
      lapses: row.lapses,
      activeReturners: row.activeReturners,
      activeNet,
    };

    subs = endingSubscribers;
    active = endingActive;
    return week;
  });
}

export const subscriberWeeks = buildSubscriberWeeks();

export const subscriberFormulas = [
  {
    name: "Entering",
    formula: "New subscriptions + reactivations of cancelled accounts",
    sign: "Always ≥ 0",
  },
  {
    name: "Exiting",
    formula: "Cancellations in the week",
    sign: "Always ≥ 0 (shown below the axis as a negative bar)",
  },
  {
    name: "Net subscription flow",
    formula: "Entering − Exiting",
    sign: "Negative only when more people cancel than join",
  },
  {
    name: "Logo churn rate",
    formula: "Exiting / starting subscribers",
    sign: "Always ≥ 0. A rate is never negative.",
  },
  {
    name: "Active-customer net",
    formula: "Entering + returners − exiting − lapses",
    sign: "Can be negative even when net flow is positive",
  },
] as const;
