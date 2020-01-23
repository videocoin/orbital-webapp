const STREAM_STATUS = {
  PREPARED: 'STREAM_STATUS_PREPARED',
  READY: 'STREAM_STATUS_READY',
};
const apiStreamsUrl = 'https://studio.dev.videocoin.network/api/v1/streams';
const apiWebRTCUrl =
  'https://studio.dev.videocoin.network/api/v1/ms/streams/webrtc';

const request = async (url, options = null) => {
  try {
    const res = await fetch(url, options);
    if (!res.ok) {
      throw new Error('Bad request');
    }
    return await res.json();
  } catch (e) {
    console.log('Error', e);
  }
};

const getPostPayload = (data = {}, token) => ({
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  },
  body: JSON.stringify(data),
});

const getGetPayload = token => ({
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  },
});

const createStream = async (token = '', profileId = '') => {
  try {
    if (!token || !profileId) {
      throw new Error('Missing argument');
    }

    const data = {
      name: 'live',
      profile_id: profileId,
    };
    const stream = await request(apiStreamsUrl, getPostPayload(data, token));
    return stream.id;
  } catch (e) {
    console.log('Error', e);
  }
};

const runStream = async (streamId = '', token = '') => {
  try {
    if (!streamId || !token) {
      throw new Error('Missing argument');
    }

    const url = `${apiStreamsUrl}/${streamId}/run`;
    return await request(url, getPostPayload({}, token));
  } catch (e) {
    console.log('Error', e);
  }
};

const getStream = async (streamId = '', token = '') => {
  try {
    if (!streamId || !token) {
      throw new Error('Missing argument');
    }

    const url = `${apiStreamsUrl}/${streamId}`;
    return await request(url, getGetPayload(token));
  } catch (e) {
    console.log('Error', e);
  }
};

const setIsStreamStatusPreparedInterval = (
  streamId = '',
  token = '',
  onPreparedCb = () => {}
) => {
  const statusInterval = setInterval(async () => {
    try {
      if (!streamId || !token) {
        throw new Error('Missing argument');
      }

      const stream = await getStream(streamId, token);

      if (stream.status === STREAM_STATUS.PREPARED) {
        await onPreparedCb(streamId, token);
        clearInterval(statusInterval);
      }
    } catch (e) {
      console.log('Error', e);
    }
  }, 2000);
};

const setIsStreamStatusReadyInterval = (
  streamId = '',
  token = '',
  onReadyCb = () => {}
) => {
  const statusInterval = setInterval(async () => {
    try {
      if (!streamId || !token) {
        throw new Error('Missing argument');
      }

      const stream = await getStream(streamId, token);

      if (stream.status === STREAM_STATUS.READY) {
        await onReadyCb(streamId, stream.output_url);
        clearInterval(statusInterval);
      }
    } catch (e) {
      console.log('Error', e);
    }
  }, 2000);
};

const connectWebRTCServer = async (streamId = '', sdp = '', token = '') => {
  try {
    if (!streamId || !token || !sdp) {
      throw new Error('Missing argument');
    }

    const data = {
      stream_id: streamId,
      sdp,
    };
    return await request(apiWebRTCUrl, getPostPayload(data, token));
  } catch (e) {
    console.log('Error', e);
  }
};

const stopStream = async (streamId = '', token = '') => {
  try {
    if (!streamId || !token) {
      throw new Error('Missing argument');
    }

    const url = `${apiStreamsUrl}/${streamId}/stop`;
    return await request(url, getPostPayload({}, token));
  } catch (e) {
    console.log('Error', e);
  }
};

export const VCApi = {
  createStream,
  runStream,
  getStream,
  stopStream,
  connectWebRTCServer,
  setIsStreamStatusPreparedInterval,
  setIsStreamStatusReadyInterval,
};
