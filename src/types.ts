type TranscriptSegment = {
  transcriptSectionHeaderRenderer: {
    startMs: string;
    endMs: string;
    snippet: {
      simpleText: string;
    };
    accessibility: {
      accessibilityData: {
        label: string;
      };
    };
    trackingParams: string;
  };
};

type TranscriptSearchPanelRenderer = {
  body: {
    transcriptSegmentListRenderer: {
      initialSegments: TranscriptSegment[];
    };
  };
};

type TranscriptRenderer = {
  trackingParams: string;
  content: {
    transcriptSearchPanelRenderer: TranscriptSearchPanelRenderer;
  };
};

type UpdateEngagementPanelAction = {
  targetId: string;
  content: {
    transcriptRenderer: TranscriptRenderer;
  };
};

type Action = {
  clickTrackingParams: string;
  updateEngagementPanelAction: UpdateEngagementPanelAction;
};

type ServiceTrackingParam = {
  service: string;
  params: {
    key: string;
    value: string;
  }[];
};

type ResponseContext = {
  serviceTrackingParams: ServiceTrackingParam[];
  mainAppWebResponseContext: {
    datasyncId: string;
    loggedOut: boolean;
    trackingParam: string;
  };
  webResponseContextExtensionData: {
    hasDecorated: boolean;
  };
};

type Response = {
  responseContext: ResponseContext;
  actions: Action[];
};
